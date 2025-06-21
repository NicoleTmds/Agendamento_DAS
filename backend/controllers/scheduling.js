const { Parser } = require('json2csv'); // Importe o Parser
const PDFDocument = require('pdfkit'); // Importe a biblioteca
const { Op, fn, col, where } = require('sequelize');
const { User, Scheduling, Doctor, Specialty, sequelize } = require('../models');
const transporter = require('../config/nodemailer');

const create = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const {
            nomePaciente, cpfPaciente, emailPaciente, telefonePaciente,
            doctorId, schedulingDate, schedulingTime
        } = req.body;

        const [user] = await User.findOrCreate({
            where: { email: emailPaciente },
            defaults: {
                name: nomePaciente,
                cpf: cpfPaciente,
                email: emailPaciente,
                telefone: telefonePaciente,
            },
            transaction: t
        });

        const existingAppointment = await Scheduling.findOne({
            where: { doctorId, schedulingDate, schedulingTime, status: 'agendado' },
            transaction: t
        });

        if (existingAppointment) {
            await t.rollback();
            return res.status(409).json({ error: 'Este horário acabou de ser preenchido. Por favor, escolha outro.' });
        }
        
        const newScheduling = await Scheduling.create({
            userId: user.id,
            doctorId,
            schedulingDate,
            schedulingTime,
        }, { transaction: t });

        await t.commit();
        
        try {
            const fullAppointmentDetails = await Scheduling.findOne({
                where: { id: newScheduling.id },
                include: [{
                    model: Doctor,
                    as: 'doctors',
                    attributes: ['name'],
                    include: [{
                        model: Specialty,
                        as: 'specialties', 
                        attributes: ['name']
                    }]
                }]
            });
            
            const mailOptions = {
                from: '"Clínica Fictícia" <nao-responda@clinica.com>',
                to: user.email,
                subject: 'Confirmação de Agendamento de Consulta',
                html: `
                    <div style="font-family: Arial, sans-serif; color: #333;">
                        <h2>Olá, ${user.name}!</h2>
                        <p>Sua consulta foi confirmada com sucesso. Seguem os detalhes:</p>
                        <ul>
                            <li><strong>Especialidade:</strong> ${fullAppointmentDetails.doctors.specialties.name}</li>
                            <li><strong>Médico(a):</strong> ${fullAppointmentDetails.doctors.name}</li>
                            <li><strong>Data:</strong> ${new Date(schedulingDate).toLocaleDateString('pt-BR', {timeZone: 'UTC'})}</li>
                            <li><strong>Horário:</strong> ${schedulingTime}</li>
                        </ul>
                        <p>Atenciosamente,<br>Sua Clínica Fictícia</p>
                    </div>
                `,
            };

            await transporter.sendMail(mailOptions);
            console.log("E-mail de confirmação enviado para:", user.email);

        } catch (emailError) {
            console.error("ERRO AO ENVIAR E-MAIL:", emailError);
        }

        return res.status(201).json(newScheduling);

    } catch (dbError) {
        await t.rollback();
        console.error("Erro no banco de dados ao criar agendamento:", dbError);
        return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};


/**
 * Busca agendamentos para um usuário específico (pelo email ou cpf).
 */
const findForUser = async (req, res) => {
    const { identifier } = req.query;
    if (!identifier) {
        return res.status(400).json({ error: 'Email ou CPF do usuário é obrigatório.' });
    }

    try {
        // Sanitiza o identificador caso seja um CPF, removendo pontos e traços
        const sanitizedIdentifier = identifier.replace(/[.-]/g, '');

        const user = await User.findOne({
            where: {
                // Procura OU pelo email exato OU pelo CPF sanitizado
                [Op.or]: [
                    { email: identifier },
                    // Compara o CPF sanitizado com o CPF sanitizado do banco
                    where(fn('regexp_replace', col('cpf'), '[.-]', '', 'g'), sanitizedIdentifier)
                ]
            }
        });

        if (!user) {
            // Retorna um array vazio para o front-end, que mostrará a mensagem de "nenhum encontrado"
            return res.status(200).json([]);
        }

        const schedulings = await Scheduling.findAll({
            where: { userId: user.id },
            include: [{
                model: Doctor,
                as: 'doctors', // CORRIGIDO: para corresponder ao seu model de Scheduling
                attributes: ['name'],
                include: [{
                    model: Specialty,
                    as: 'specialties', // CORRIGIDO: para corresponder ao seu model de Doctor
                    attributes: ['name']
                }]
            }],
            order: [['schedulingDate', 'DESC']]
        });

        res.setHeader('Cache-Control', 'no-store');
        return res.status(200).json(schedulings);

    } catch (error) {
        console.error("Erro no controller scheduling.findForUser:", error);
        return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

/**
 * Cancela um agendamento.
 */
const cancel = async (req, res) => {
    const { id } = req.params;
    try {
        const scheduling = await Scheduling.findByPk(id);
        if (!scheduling) {
            return res.status(404).json({ message: 'Agendamento não encontrado.' });
        }
        
        // Impede o cancelamento de uma consulta que já foi cancelada
        if (scheduling.status === 'cancelado') {
            return res.status(400).json({ message: 'Este agendamento já está cancelado.' });
        }
        
        scheduling.status = 'cancelado';
        await scheduling.save();
        return res.status(200).json(scheduling);
    } catch (error) {
        console.error("Erro ao cancelar agendamento:", error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};


/**
 * Gera um relatório de agendamentos para uma data específica.
 */
const generateReport = async (req, res) => {
    const { date } = req.query;
    if (!date) {
        return res.status(400).json({ error: 'A data é obrigatória.' });
    }

    try {
        const schedulings = await Scheduling.findAll({
            where: { schedulingDate: date },
            include: [
                { model: User, as: 'users', attributes: ['name', 'telefone'] }, // <-- CORRIGIDO para singular
                {
                    model: Doctor,
                    as: 'doctors', // <-- CORRIGIDO para singular
                    attributes: ['name'],
                    include: [{ model: Specialty, as: 'specialties', attributes: ['name'] }] // <-- CORRIGIDO para singular
                }
            ],
            order: [['schedulingTime', 'ASC']]
        });

        res.setHeader('Cache-control', 'no-store');
        return res.status(200).json(schedulings);
    } catch (error) {
        console.error("Erro em generateReport:", error);
        return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};


/**
 * Exporta um relatório em formato CSV
 */
const exportReport = async (req, res) => {
    const { format } = req.params;
    const { date } = req.query;

    if (!date) {
        return res.status(400).json({ error: 'A data é obrigatória.' });
    }

    try {
        const schedulings = await Scheduling.findAll({
            where: { schedulingDate: date },
            include: [
                { model: User, as: 'users', attributes: ['name', 'telefone'] },
                {
                    model: Doctor,
                    as: 'doctors',
                    attributes: ['name'],
                    include: [{ model: Specialty, as: 'specialties', attributes: ['name'] }]
                }
            ],
            order: [['schedulingTime', 'ASC']],
            // Usamos raw: true e nest: true para facilitar a manipulação do objeto
            raw: true,
            nest: true
        });

        if (format === 'csv') {
            // "Achatamos" os dados primeiro
            const flatData = schedulings.map(ag => ({
                paciente: ag.users.name,
                contato: ag.users.telefone,
                especialidade: ag.doctors.specialties.name,
                medico: ag.doctors.name,
                horario: ag.schedulingTime,
                status: ag.status
            }));

            // Cabeçalhos para o CSV
            const fields = [
                { label: 'Paciente', value: 'paciente' },
                { label: 'Contato', value: 'contato' },
                { label: 'Especialidade', value: 'especialidade' },
                { label: 'Médico', value: 'medico' },
                { label: 'Horário', value: 'horario' },
                { label: 'Status', value: 'status' },
            ];
            
            const json2csvParser = new Parser({ fields, withBOM: true });
            const csv = json2csvParser.parse(flatData);

            res.header('Content-Type', 'text/csv; charset=utf-8');
            res.attachment(`relatorio-agendamentos-${date}.csv`);
            return res.send(csv);
        }
        

    } catch (error) {
        console.error("Erro ao exportar relatório:", error);
        return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

/**
 * Gera um comprovante em PDF para um único agendamento.
 */
const generatePdfForOne = async (req, res) => {
    try {
        const { id } = req.params; // Pega o ID do agendamento da URL

        // Busca todos os detalhes daquele agendamento específico
        const appointment = await Scheduling.findOne({
            where: { id },
            include: [
                { model: User, as: 'users' },
                {
                    model: Doctor,
                    as: 'doctors',
                    include: [{ model: Specialty, as: 'specialties' }]
                }
            ]
        });

        if (!appointment) {
            return res.status(404).json({ message: 'Agendamento não encontrado.' });
        }

        // Cria um novo documento PDF
        const doc = new PDFDocument({ margin: 50 });

        // Define os headers para forçar o download no navegador
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="comprovante-agendamento-${id}.pdf"`);

        // Envia o PDF para o navegador conforme ele é gerado
        doc.pipe(res);

        // Desenha o conteúdo do PDF
        doc.fontSize(20).font('Helvetica-Bold').text('Comprovante de Agendamento', { align: 'center' });
        doc.moveDown(2);

        doc.fontSize(12).font('Helvetica-Bold').text('Paciente:');
        doc.font('Helvetica').text(appointment.users.name);
        doc.moveDown();

        doc.font('Helvetica-Bold').text('CPF:');
        doc.font('Helvetica').text(appointment.users.cpf);
        doc.moveDown();

        doc.font('Helvetica-Bold').text('Consulta:');
        doc.font('Helvetica').text(`- Especialidade: ${appointment.doctors.specialties.name}`);
        doc.text(`- Médico(a): ${appointment.doctors.name}`);
        doc.moveDown();

        doc.font('Helvetica-Bold').text('Data e Horário:');
        const formattedDate = new Date(appointment.schedulingDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
        doc.font('Helvetica').text(`${formattedDate} às ${appointment.schedulingTime}`);
        doc.moveDown(3);

        doc.fontSize(10).font('Helvetica-Oblique').text('Este é um comprovante gerado automaticamente. Apresente no dia da sua consulta.', { align: 'center' });

        // Finaliza o PDF
        doc.end();

    } catch (error) {
        console.error("Erro ao gerar PDF:", error);
        return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};

module.exports = {
    create,
    findForUser,
    generateReport,
    cancel,
    exportReport,
    generatePdfForOne
};