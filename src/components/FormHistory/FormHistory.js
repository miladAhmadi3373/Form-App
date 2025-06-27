import React , {useState} from "react";
import { IoIosArrowBack } from "react-icons/io";
import FormMessage from "../FormMessage/FormMessage";
import "./FormHistory.css";

export default function FormHistory() {
  // const [Message , setMessage] = useState(FormMessage)
  return (
    <>
      <div className="Form-container">
        <div className="Form-title">
          <h3>سوابق تغییرات فرم</h3>
          <IoIosArrowBack size={20} color="#818389" />
        </div>
        <div className="Form-body">
            <FormMessage></FormMessage>
        </div>
      </div>
    </>
  );
}
