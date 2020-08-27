const axios = require("axios");
const qs = require("querystring");
require("dotenv").config();

const envSettings = {
  pass: process.env.CLIENT_SECRET,
  uri_list_fac: process.env.CLIENT_URL_LIST_FAC,
  uri_rep: process.env.CLIENT_URL_REPORT,
  uri_oc_emi: process.env.CLIENT_URL_EMI_OC,
  uri_anul: process.env.CLIENT_URL_ANULATE,  
  uri_infox: process.env.CLIENT_URL_EMI_INFOX,
  user: process.env.PXP_USER,
};

const onGetFacture = async (data) => {
  const dataCI = qs.stringify({
    ci: data.ci_estudiante,
  });

  const requestOptions = {
    method: "post",
    url: envSettings.uri_list_fac,
    headers: {
      "Php-Auth-User": envSettings.pass,
      "Pxp-user": envSettings.user,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: dataCI,
  };

  try {
    const resp = await axios(requestOptions);
    return resp.data.datos;
  } catch (error) {
    return error;
  }
};

const onGetOrderCode = async (data) => {
  // const obj = JSON.stringify({"source":"erp","OrderCode":"EMIBLZPK"})
  const obj = JSON.stringify({ source: "erp", OrderCode: data.code });

  const requestOptions = {
    method: "POST",
    url: envSettings.uri_oc_emi,
    headers: { "Content-Type": "application/json" },
    data: obj,
  };

  try {
    const response = await axios(requestOptions);
    return response.data;
  } catch (err) {
    return err;
  }
};

const onDownload = async (data) => {
  const process = qs.stringify({
    id_proceso_wf: data.id,
  });

  const config = {
    method: "post",
    url: envSettings.uri_rep,
    headers: {
      "Php-Auth-User": envSettings.pass,
      "Pxp-user": envSettings.user,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: process,
  };
  try {
    const resp = await axios(config);
    return resp.data.ROOT.detalle;
  } catch (error) {
    return error;
  }
};

const onAnulate = async (data) => {
  const process = qs.stringify({
    id_venta: data.id,
  });

  const configAn = {
    method: "post",
    url: envSettings.uri_anul,
    headers: {
      "Php-Auth-User": envSettings.pass,
      "Pxp-user": envSettings.user,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: process,
  };
  try {
    const resp = await axios(configAn);
    return resp.data.ROOT.detalle;
  } catch (error) {
    return error;
  }
};

const onInsertDataInformix = async (data) => {
  const obj = JSON.stringify({ 
        source: "erp", 
        OrderCode: "EMIBLZPK", 
        new_nit: data.nit,
        new_razon_social: data.razon_social,
        new_email: data.email
    })

  const requestOptions = {
    method: "POST",
    url: envSettings.uri_infox,
    headers: { "Content-Type": "application/json" },
    data: obj
  }

  try {
    const response = await axios(requestOptions);
    return response.data
  } catch (err) {
    return err
  }
};

const onProcessFacture = async (data) => {
  // const orCode = await onGetOrderCode({"code":'EMIBLZPK'})

  try {
    // const respAnulate = await onAnulate(data)
    const insertInforx = await onInsertDataInformix(data);        
    console.log("insertInformix", insertInforx);
    return insertInforx
    
  } catch (error) {
    return error;
  }
};

module.exports = {
  onGetFacture,
  onDownload,
  onGetOrderCode,
  onProcessFacture,
};
