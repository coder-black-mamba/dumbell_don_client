import React, { useEffect } from 'react'
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import * as htmlToImage from "html-to-image";
import { toPng } from "html-to-image";
import Loader from "../components/common/Loader";
import Recipt from "../components/Recipt";
import {useLocation, useNavigate} from "react-router";



const DownloadRecipt = () => {
    const { payment } = useLocation().state || { payment: null };
    const navigate = useNavigate();
    console.log(payment)

    // redirect to dashboard if payment is null
    useEffect(() => {
      if (!payment) {
        navigate('/dashboard');
      }
    }, [payment])
    
    
    // const handleDownloadReceipt = () => {
    //     const node = document.getElementById("receipt-card");
    //     toPng(node)
    //       .then((dataUrl) => {
    //         const pdf = new jsPDF("p", "mm", "a4");
    //         const imgProps = pdf.getImageProperties(dataUrl);
    //         const pdfWidth = pdf.internal.pageSize.getWidth();
    //         const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
    //         pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
    //         pdf.save(`receipt-${payment?.reference}.pdf`);
    //       })
    //       .catch((err) => {
    //         console.error("Error generating image", err);
    //       })
    //       .finally(() => {});
    //   };

    // const handleDownloadReceipt = () => {
    //     const node = document.getElementById("receipt-card");
      
    //     toPng(node, { cacheBust: true })
    //       .then((dataUrl) => {
    //         const pdf = new jsPDF("p", "mm", "a4");
    //         const pdfWidth = pdf.internal.pageSize.getWidth();
    //         const pdfHeight = pdf.internal.pageSize.getHeight();
      
    //         // image dimensions
    //         const imgProps = pdf.getImageProperties(dataUrl);
    //         const imgWidth = imgProps.width;
    //         const imgHeight = imgProps.height;
      
    //         // scale to fit
    //         const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      
    //         const imgX = (pdfWidth - imgWidth * ratio) / 2;
    //         const imgY = 20; // margin from top
      
    //         pdf.addImage(
    //           dataUrl,
    //           "PNG",
    //           imgX,
    //           imgY,
    //           imgWidth * ratio,
    //           imgHeight * ratio
    //         );
      
    //         pdf.save(`receipt-${payment?.reference}.pdf`);
    //       })
    //       .catch((err) => {
    //         console.error("Error generating image", err);
    //       });
    //   };

    const handleDownloadReceipt = () => {
        const node = document.getElementById("receipt-card");
    
        toPng(node, { quality: 1.0 })
          .then((dataUrl) => {
            const pdf = new jsPDF("p", "mm", "a5");
    
            const imgProps = pdf.getImageProperties(dataUrl);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
    
            const margin = 0; // space from edges
            let imgWidth = pdfWidth - margin * 2;
            let imgHeight = (imgProps.height * imgWidth) / imgProps.width;
    
            // If the image is too tall, scale it by height instead
            if (imgHeight > pdfHeight - margin * 2) {
              imgHeight = pdfHeight - margin * 2;
              imgWidth = (imgProps.width * imgHeight) / imgProps.height;
            }
    
            const x = (pdfWidth - imgWidth) / 2; // center horizontally
            const y = (pdfHeight - imgHeight) / 2; // center vertically
    
            pdf.addImage(dataUrl, "PNG", 0, 0, imgWidth, imgHeight);
            pdf.save(`receipt-${payment?.reference}.pdf`);
          })
          .catch((err) => {
            console.error("Error generating image", err);
          });
      };
    





  return (
    <div className='flex flex-col items-center justify-center h-screen p-5'>
      <div
        id="receipt-card"
        className=" card w-[550px]  bg-white  shadow-2xl overflow-hidden rounded-none"
      >
        <Recipt payment={payment} />
      </div>
      <button onClick={handleDownloadReceipt} className='btn bg-brand mt-5'>Download Receipt</button>
    </div>
  )
}

export default DownloadRecipt