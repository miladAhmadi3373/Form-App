import React from "react";

export default function FormUploadeCondition(props) {
  return (
    <div>
      {props.new_value === null || props.new_value == " " ? (
        <>
          <p className="message">
            مقدار فیلد {<span className="delete-message">{props.field}</span>}{" "}
            حذف شد
          </p>
        </>
      ) : (
        <>
          {props.old_value === null || props.old_value === "" ? (
            <>
              <p className="message">
                فایل{" "}
                <span className="newFile-message">
                  {props.new_value.file_name}
                </span>{" "}
                بارگذاری شد
              </p>
            </>
          ) : (
            <>
              <p className="message">
                {`فیلد ${props.field}: از ${props.old_value} به`}{" "}
                {
                  <span className="newFile-message">
                    {props.new_value.file_name}
                  </span>
                }{" "}
                تغییر یافت
              </p>
              <br />
            </>
          )}
        </>
      )}
    </div>
  );
}
