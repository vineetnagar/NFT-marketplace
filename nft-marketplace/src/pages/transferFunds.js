import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Style from "../styles/transferFunds.module.css";
import { FaEthereum, FaUserAlt } from "react-icons/fa";
import formStyle from "../../AccountPage/Form/Form.module.css";
import images from "../../img";
import { Button, Loader } from "../../components/NavBar/componentIndex";
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";

const transferFunds = () => {
  const { currentAccount, transferEther, accountBalance } = useContext(
    NFTMarketplaceContext,
  );
  const [transferAmount, setTransferAmount] = useState("");
  const [transferAccount, setTransferAccount] = useState("");
  const [message, setMessage] = useState("");
  const [readMessage, setReadMessage] = useState("");
  const [openBox, setOpenBox] = useState(false);

  const transaction = [1, 2, 3, 4, 5, 6, 7];
  return (
    <div className={Style.transfer}>
      <div className={Style.transfer_box}>
        <h1>Transfer Ether</h1>
        <p>
          lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua
        </p>
        <div className={Style.transfer_box_box}>
          <div className={Style.transfer_box_box_left}>
            <Image
              src={images.transfer}
              alt="images"
              width={400}
              height={400}
            />
          </div>
          <div className={Style.transfer_box_box_right}>
            <h2>Now you can transfer ether</h2>
            <div className={Style.transfer_box_box_right_info}>
              <p className={Style.transfer_box_box_right_info_deskTop}>
                Account: {currentAccount}
              </p>
              <p className={Style.transfer_box_box_right_info_mobile}>
                Account: {currentAccount.slice(1, 30)}..
              </p>
              <p>Balance: {accountBalance}</p>
            </div>

            <div classname={Style.transfer_box_box_right_box}>
              <div className={formStyle.Form_box_input}>
                <div className={formStyle.Form_box_input_box}>
                  <div className={formStyle.Form_box_input_box_icon}>
                    <FaUserAlt />
                  </div>
                  <input
                    type="text"
                    placeholder="address*"
                    onChange={(e) => setTransferAccount(e.target.value)}
                  />
                </div>
              </div>
              <div className={formStyle.Form_box_input}>
                <div className={formStyle.Form_box_input_box}>
                  <div className={formStyle.Form_box_input_box_icon}>
                    <FaEthereum />
                  </div>
                  <input
                    type="number"
                    min={1}
                    placeholder="ETH"
                    onChange={(e) => setTransferAmount(e.target.value)}
                  />
                </div>
              </div>
              <div className={formStyle.Form_box_input}>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="6"
                  placeholder="your message in few words"
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
              {/* {loading ? (
                <Loader />
              ) : ( */}
              <Button
                btnName="Transfer Funds"
                handleClick={() =>
                  transferEther(transferAccount, transferAmount, message)
                }
                classStyle={Style.button}
              />
              {/* )} */}
            </div>
          </div>
        </div>

        <h1 className={Style.transfer_box_h1}>Transaction History</h1>
        <p>
          lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua
        </p>

        <div className={Style.transfer_box_history}>
          {transaction.map((el, i) => (
            <div className={Style.transfer_box_history_item} key={i + 1}>
              <Image
                src={images.transfer}
                alt="image"
                width={100}
                height={100}
              />

              <div className={Style.transfer_box_history_item_info}>
                <p>
                  <span>Transfer ID:</span> #1
                </p>
                <p>
                  <span>Amount:</span> #1
                </p>
                <p>
                  <span>From :</span> #1
                </p>
                <p>
                  <span>To :</span> #1
                </p>
                <Button
                  btnName="Message"
                  handleClick={() => (
                    setReadMessage("hhaha"), setOpenBox(true)
                  )}
                  classStyle={Style.readButton}
                />
              </div>
            </div>
          ))}
        </div>

        {openBox == false ? (
          ""
        ) : (
          <div className={Style.messageBox} onClick={() => setOpenBox(false)}>
            <div className={Style.messageBox_box}>
              <h1>Transaction Message</h1>
              <p>Hey your Message</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default transferFunds;
