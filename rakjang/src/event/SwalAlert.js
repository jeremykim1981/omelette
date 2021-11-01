import Swal from "sweetalert2";

export default {
  Success: async (
    options = {
      title: "อัพเดตข้อมูลสำเร็จ",
      text: "สำเร็จ",
      confirmButtonText: "ยืนยัน",
      other: {},
    }
  ) => {
    try {
      return await Swal.fire({
        title: options.title,
        text: options.text,
        icon: "success",
        confirmButtonText: options.confirmButtonText || "ยืนยัน",
        ...options.other,
      });
    } catch (error) {}
  },
  Fail: async (
    options = { title: "ERROR", text: "Something went wrong", other: {} }
  ) => {
    try {
      return await Swal.fire({
        title: options.title,
        text: options.text,
        icon: "error",
        confirmButtonText: "ยืนยัน",
        ...options.other,
      });
    } catch (error) {}
  },
  Warning: async (options = { title: "WARNING", text: "", other: {} }) => {
    try {
      return await Swal.fire({
        title: options.title,
        text: options.text,
        icon: "warning",
        confirmButtonText: "ยืนยัน",
        ...options.other,
      });
    } catch (error) {}
  },
  Async: async (
    options = {
      title: "ยืนยันการบันทึกใช่หรือไม่ ?",
      text: "",
      callback: () => {},
      other: {},
    }
  ) => {
    try {
      const resultSwalAlert = await Swal.fire({
        title: options.title,
        showCancelButton: true,
        confirmButtonText: `บันทึก`,
        cancelButtonText: "ยกเลิก",
        showLoaderOnConfirm: true,
        showLoaderOnDeny: false,
        preConfirm: async () => {
          return await options.callback();
        },
        ...options.other,
      });
      return resultSwalAlert;
    } catch (error) {
      console.log("Er", error);
    }
  },
};
