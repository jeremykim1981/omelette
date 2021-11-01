import { useState, useCallback, useEffect } from "react";
import { AddUrlToFile, getPathUrl } from "../../function/functions";
import { useDispatch, useSelector } from "react-redux";

// AWS
import { Storage } from "aws-amplify";

// COMPONENT
import Button from "../Button/Button";

// EVENT
import SwalAlert from "../../event/SwalAlert";

// API
import { updateProfile } from "../../api/profile";
import { S3Image } from "aws-amplify-react";
import { initializeApp } from "../../_redux/initializeAppSlice";

const Field = ({ title, name, form, setField, disabled = true }) => {
  return (
    <div className="flex justify-start items-center space-x-4">
      <div className=" font-light w-36 text-right">{title}</div>
      <input
        value={form?.[name]}
        onChange={(e) => {
          setField(name)(e.target.value);
        }}
        disabled={disabled}
        className=" border w-full  px-2 py-2  focus:outline-none "
      ></input>
    </div>
  );
};

const BankField = ({ title, name, form, setField, disabled }) => {
  return (
    <div>
      <div className="flex flex-col justify-start items-start  space-y-2">
        <div className=" font-light ">{title}</div>
      </div>
      <input
        value={form?.[name]}
        onChange={(e) => {
          setField(name)(e.target.value);
        }}
        disabled={disabled}
        className=" border w-full  px-2 py-2  focus:outline-none "
      />
    </div>
  );
};

const Account = () => {
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.initializeApp);

  const [form, setForm] = useState("");
  const [file, setFile] = useState(null);
  const [imageSrc, setImageSrc] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (!user) return;

    let phone_number = user.phone_number;
    if (user?.phone_number?.indexOf("+66") !== -1) {
      phone_number = "0" + user.phone_number.slice(3, user.phone_number.length);
    }
    setForm({ ...user, phone_number });
  }, [user, status]);

  const setField = (field) => (e) => {
    const value = e && e.target ? e.target.value : e;
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  };

  const onClickUploadAvatar = async ({ target: { files } }) => {
    const file = await files[0];
    setFile(file);
    let imageDataUrl = await AddUrlToFile(file);
    setImageSrc(imageDataUrl);
  };

  const onUpdateProfile = async () => {
    try {
      const resultSwalAlert = await SwalAlert.Async({
        title: "ยืนยันการบันทึกข้อมูล ?",
        callback: async () => {
          try {
            let uploadFile = "";
            if (imageSrc) {
              uploadFile = await Storage.put(Date.now(), file);
            }

            return await updateProfile(user.id, {
              cover_image: uploadFile.key,
              first_name: form.first_name,
              last_name: form.last_name,
              phone_number: form.phone_number,
              email: form.email,
              crypto_wallet: form.crypto_wallet,
              address: {
                address: form.address,
                postal_code: form.postal_code,
              },
              bank: {
                bank_name: form.bank_name,
                bank_number: form.bank_number,
                bank_account: form.bank_account,
                bank_branch: form.bank_branch,
              },
            });
          } catch (error) {
            return {
              error,
            };
          }
        },
      });
      if (resultSwalAlert.value.error) {
        return await SwalAlert.Fail({
          title: "ERROR",
          text: resultSwalAlert.value.error.response.data.message,
        });
      }
      if (!resultSwalAlert.isConfirmed) return;
      await SwalAlert.Success();
      dispatch(initializeApp());
      resetForm();
    } catch (error) {
      await SwalAlert.Fail({ text: error.message });
    } finally {
    }
  };

  const resetForm = () => {
    setForm({ ...user });
    setIsEdit(false);
  };

  const onCancelUpdateProfile = () => {
    resetForm();
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <div className="w-full xl:w-2/3 mx-auto text-textgray bg-bgblog rounded-lg p-4 space-y-4 ">
          <div className="flex flex-col justify-center items-center  ">
            {imageSrc ? (
              <img
                className="w-32 h-32 object-cover rounded-full "
                src={imageSrc}
              />
            ) : user?.cover_image ? (
              <img
                className="w-32 h-32 object-cover rounded-full"
                src={getPathUrl(user?.cover_image)}
              />
            ) : (
              <img
                className="w-32 h-32 object-cover rounded-full"
                src={"../icon/user.png"}
              />
            )}
            <label for="button-file">
              <div>
                <div className="underline cursor-pointer">อัพโหลดรูปภาพ</div>
                <input
                  accept="image/jpeg,image/gif,image/png"
                  className="hidden"
                  id="button-file"
                  type="file"
                  onChange={onClickUploadAvatar}
                />
              </div>
            </label>

            <div className=" font-light">
              File size: maximum 1 MB File extension: .JPEG, .PNG
            </div>
          </div>
          <div className=" space-y-4">
            <div className=" flex justify-between items-center text-black ">
              <div>บัญชีของฉัน</div>
              <button
                onClick={() => setIsEdit(!isEdit)}
                className="bg-transparent focus:outline-none outline-none"
              >
                <svg
                  className="w-6 h-6 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
            </div>
            <Field
              form={form}
              title="ชื่อจริง"
              name="first_name"
              setField={setField}
              disabled={!isEdit}
            />
            <Field
              form={form}
              title="นามสกุล"
              name="last_name"
              setField={setField}
              disabled={!isEdit}
            />
            <Field
              title="หมายเลขโทรศัพท์"
              name="phone_number"
              setField={setField}
              form={form}
              disabled={!isEdit}
            />
            <Field
              title="อีเมล"
              name="email"
              form={form}
              setField={setField}
              disabled={!isEdit}
            />
            {/* <Field
              title="Username"
              name="Username"
              form={form}
              setField={setField}
              disabled={!isEdit}
            /> */}
            <div className="border-b pt-6"></div>
          </div>
          <div className=" space-y-4">
            <div className=" flex justify-between items-center text-black ">
              <div>ที่อยู่</div>
            </div>
            <Field
              form={form}
              title="ที่อยู่"
              name="address"
              setField={setField}
              disabled={!isEdit}
            />
            <Field
              form={form}
              title="รหัสไปรษณีย์"
              name="postal_code"
              setField={setField}
              disabled={!isEdit}
            />

            <div className="border-b pt-6"></div>
          </div>
          <div className=" space-y-4">
            <div className=" flex justify-between items-center text-black ">
              <div>Crypto Wallet</div>
            </div>
            <Field
              form={form}
              title="Crypto Wallet"
              name="crypto_wallet"
              setField={setField}
              disabled={!isEdit}
            />

            <div className="border-b pt-6"></div>
          </div>
          <div className=" space-y-4">
            <div className=" flex justify-between items-center text-black ">
              <div>บัญชีที่ต้องการรับเงิน</div>
            </div>
            <BankField
              form={form}
              title="ชื่อธนาคาร"
              name="bank_name"
              setField={setField}
              disabled={!isEdit}
            />
            <BankField
              form={form}
              title="เลขที่บัญชี (กรุณากรอกเฉพาะตัวเลข 10 หลัก)"
              name="bank_number"
              setField={setField}
              disabled={!isEdit}
            />
            <BankField
              form={form}
              title="ชื่อบัญชี"
              name="bank_account"
              setField={setField}
              disabled={!isEdit}
            />
            <BankField
              form={form}
              title="สาขา"
              name="bank_branch"
              setField={setField}
              disabled={!isEdit}
            />
          </div>
          {isEdit && (
            <div className="space-x-2">
              <button
                onClick={onUpdateProfile}
                className="bg-green-500 cursor-pointer focus:outline-none outline-none shadow text-white px-3 py-2 rounded"
              >
                บันทึก
              </button>
              <button
                onClick={onCancelUpdateProfile}
                className="bg-red-500 cursor-pointer focus:outline-none outline-none shadow text-white px-3 py-2 rounded"
              >
                ยกเลิก
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Account;
