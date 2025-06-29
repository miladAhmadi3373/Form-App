import React, { useState, useEffect } from "react";
import FormCondition from "../FormCondition";
import "./FormMessage.css";
import FormUploadeCondition from "../FormUploadeCondition";

export default function FormMessage() {
  const [formID, setformID] = useState("173");
  const [responseID, setresponseID] = useState("24");
  const [Data, setData] = useState([]);
  const [logoColor, setLogoColor] = useState("black");

  let user;
  useEffect(() => {
    const FetchApi = async () => {
      try {
        const api = await fetch(
          `https://parandeh.darkube.app/form/${formID}/response-history/${responseID}/`,
          {
            method: "GET",
          }
        )
          .then((response) => response.json())
          .then((data) => setData(data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    FetchApi();
  });
  Data.map((data) => {
    user = data.telegram_username.slice(1, 2).toLowerCase();
  });
  useEffect(() => {
    const getColorByUser = (userName) => {
      if (typeof userName === "string" && userName.length > 0) {
        switch (user) {
          case "a":
            return "red";
          case "b":
            return "blue";
          case "c":
            return "green";
          case "d":
            return "gray";
          case "e":
            return "greenyellow";
          case "f":
            return "aqua";
          case "s":
            return "skyblue";
          case "g":
            return "blueviolet";
          default:
            return "orange";
        }
      }
      return "black";
    };
    setLogoColor(getColorByUser(user));
  }, [user]);

  return (
    <>
      {!Data.detail ? (
        <>
          {Data.map((data) => (
            <>
              <div className="container">
                <div className="message-container">
                  <p className="username-message">
                    <span>{data.telegram_username}</span>کاربر
                  </p>
                  {data.action == "created" ? (
                    <>
                      {!data.changes.length == 0 ? (
                        <>
                          {data.changes.map((message) => (
                            <>
                              <p className="message">
                                {message.field == "نام"
                                  ? message.new_value
                                  : null}
                                {message.field == "عکس"
                                  ? message.new_value
                                  : null}
                                {message.field == "عکس کارت ملی"
                                  ? message.new_value
                                  : null}
                                {message.field == "عکس گواهینامه"
                                  ? message.new_value
                                  : null}{" "}
                                :{message.field}
                              </p>
                            </>
                          ))}
                        </>
                      ) : (
                        <>
                          <p className="message">هیچ اطلاعاتی ثبت نشده است</p>
                        </>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                  {data.action == "updated" ? (
                    <>
                      {!data.changes.length == 0 ? (
                        <>
                          {data.changes.map((message) => (
                            <>
                              {message.field == "نام" ? (
                                <>
                                  <FormCondition {...message} />
                                </>
                              ) : null}
                              {/* اپلود عکس  */}
                              {message.field == "اپلود عکس" ? (
                                <>
                                  <FormUploadeCondition {...message} />
                                </>
                              ) : null}
                              {/* اپلود عکس  */}
                              {message.field == "عکس" ? (
                                <>
                                  <FormUploadeCondition {...message} />
                                </>
                              ) : null}
                              {message.field == "عکس کارت ملی" ? (
                                <>
                                  <FormUploadeCondition {...message} />
                                </>
                              ) : null}
                              {message.field == "عکس گواهینامه" ? (
                                <>
                                  <FormUploadeCondition {...message} />
                                </>
                              ) : null}
                              {message.field == "موضوع" ? (
                                <>
                                  <FormCondition {...message} />
                                </>
                              ) : null}
                              {message.field == "عدد" ? (
                                <>
                                  <FormCondition {...message} />
                                </>
                              ) : null}
                            </>
                          ))}
                        </>
                      ) : (
                        <>
                          <p className="message">هیچ تغییری انجام نشده است</p>
                        </>
                      )}
                    </>
                  ) : (
                    <></>
                  )}

                  {data.action == "deleted" ? (
                    <>
                      {!data.changes.length == 0 ? (
                        <>
                          {data.changes.map((message) => (
                            <>
                              <p className="message">
                                {message.new_value} :{message.field}
                              </p>
                            </>
                          ))}
                        </>
                      ) : (
                        <>
                          <p className="message">
                            هیچ اطلاعاتی <span>حذف</span> نشده است
                          </p>
                        </>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="message-bottom-container">
                  <div
                    className="username-container"
                    style={{ backgroundColor: logoColor }}
                  >
                    {data.telegram_username.slice(1, 3)}
                  </div>
                  <p className="message-time">{data.time}</p>
                </div>
              </div>
            </>
          ))}
        </>
      ) : (
        <>
          <div className="container">
            <div className="datail-message-container">
              <p className="datail-message">{Data.detail}</p>
            </div>
          </div>
        </>
      )}
    </>
  );
}