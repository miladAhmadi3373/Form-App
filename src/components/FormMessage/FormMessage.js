import React, { useState, useEffect } from "react";
import "./FormMessage.css";

export default function FormMessage() {
  const [formID, setformID] = useState("177");
  const [responseID, setresponseID] = useState("106");
  const [Data, setData] = useState([]);

  let nameOldValue;
  let imgOldValue;
  let meliCardOldValue;
  let driversLicenseOldValue;

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
  return (
    <>
      {!Data.detail ? (
        <>
          {Data.map((data) => (
            <>
              <div className="container">
                <div className="message-container">
                  <p className="username-message">
                    <span>{data.telegram_username.slice(1, 15)}</span>کاربر
                  </p>
                  {data.action == "created" ? (
                    <>
                      {data.changes.map((message) => (
                        <>
                          <p className="message">
                            {message.field == "نام" ? (nameOldValue = message.new_value) : null}
                            {message.field == "عکس" ? (imgOldValue = message.new_value) : null}
                            {message.field == "عکس کارت ملی" ? (meliCardOldValue = message.new_value) : null}
                            {message.field == "عکس گواهینامه" ? (driversLicenseOldValue = message.new_value) : null} :{message.field}
                          </p>
                        </>
                      ))}
                    </>
                  ) : (
                    <></>
                  )}

                  {data.action == "updated" ? (
                    <>
                      {data.changes.map((message) => (
                        <>
                          {message.field == "نام" ? (
                            <>
                              <p className="message">{`فیلد ${
                                message.field
                              }: از ${nameOldValue} به ${(nameOldValue =
                                message.new_value)} تغییر یافت`}</p>
                              <br />
                            </>
                          ) : null}
                          {message.field == "عکس" ? (
                            <>
                              <p className="message">{`فیلد ${
                                message.field
                              }: از ${imgOldValue} به ${(imgOldValue =
                                message.new_value)} تغییر یافت`}</p>
                              <br />
                            </>
                          ) : null}
                          {message.field == "عکس کارت ملی" ? (
                            <>
                              <p className="message">{`فیلد ${
                                message.field
                              }: از ${meliCardOldValue} به ${(meliCardOldValue =
                                message.new_value)} تغییر یافت`}</p>
                              <br />
                            </>
                          ) : null}
                          {message.field == "عکس گواهینامه" ? (
                            <>
                              <p className="message">{`فیلد ${
                                message.field
                              }: از ${driversLicenseOldValue} به ${(driversLicenseOldValue =
                                message.new_value)} تغییر یافت`}</p>
                              <br />
                            </>
                          ) : null}
                        </>
                      ))}
                    </>
                  ) : (
                    <></>
                  )}

                  {data.action == "deleted" ? (
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
                    <></>
                  )}
                </div>
                <div className="message-bottom-container">
                  <div className="username-container">
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
//https://parandeh.darkube.app/form/%7Bform_id%7D/response-history/%7Bresponse_id%7D/
