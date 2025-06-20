import instagram from "../assets/logoMidia/instagram-circle.png"
import twitter from "../assets/logoMidia/twitter.png"
import telegram from "../assets/logoMidia/telegram-app.png"
import facebook from "../assets/logoMidia/facebook-f.png"
import tiktok from "../assets/logoMidia/tiktok.png"
import pinterest from "../assets/logoMidia/pinterest.png"
import security from "../assets/logoCards/image.png"

import { Link } from "react-router-dom"


function Footer() {
  return (
    <footer className="bg-white text-white pt-6">
      <div className="bg-[rgb(15,34,45)] py-2 mt-6">

        <div className=" flex h-10">
          <div className="auto-cols-auto grow w-10">
            <div className="h-5 border-b"></div>
            <div className="h-5"></div>
          </div>

          <div className="auto-cols-auto grow w-10">
            <div className="h-5 border-b"></div>
            <div className="h-5"></div>
          </div>
        </div>

        <div className=" px-[15rem] my-2 mb-10 space-y-6 bg-[#6B7880]">

        </div>
      </div>
    </footer>
  );
}

export default Footer