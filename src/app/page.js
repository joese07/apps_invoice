"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { Fragment, useEffect, useState } from "react";
import angkaTerbilangJs from "@develoka/angka-terbilang-js";
import {
  Document,
  Page,
  PDFDownloadLink,
  PDFViewer,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

export default function Home() {
  const [tujuan, setTujuan] = useState("");
  const [proses, setProses] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [quantity, setQuantity] = useState("");
  const [hargaSatuan, setHargaSatuan] = useState("");
  const [jumlah, setJumlah] = useState(0);
  const [total, setTotal] = useState(0);
  const [resultInvoice, setResultInvoice] = useState([]);

  // const addCommas = (num) =>
  //   num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  // const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, "");

  const thouSep = ".";
  const decSep = ",";
  // format to money
  const toMoney = (num) => {
    return (Math.round(num * 100) / 100)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,")
      .replace(/[,.]/g, function (m) {
        return m === "," ? thouSep : decSep;
      });
  };

  // console.log(Number(hargaSatuan));

  const numberFormatter = Intl.NumberFormat("en-US");

  console.log(numberFormatter.format(hargaSatuan));

  useEffect(() => {
    setJumlah(parseInt(quantity) * parseInt(hargaSatuan));
  });

  const onSubmit = () => {
    const id = resultInvoice.length + 1;
    setResultInvoice((prev) => [
      ...prev,
      {
        id: id,
        keterangan: keterangan,
        quantity: quantity,
        hargaSatuan: hargaSatuan,
        jumlah: jumlah,
      },
    ]);
    setKeterangan("");
    setQuantity("");
    setHargaSatuan("");
  };

  let sum = 0;
  let dataJumlahA = resultInvoice.map((data) => data.jumlah);

  dataJumlahA.forEach((data) => {
    sum += data;
  });
  useEffect(() => {
    setTotal(sum);
  });
  console.log(angkaTerbilangJs(total));

  const tableRowsCount = 11;

  const borderColor = "#90e5fc";

  const stylesTableHeader = StyleSheet.create({
    container: {
      flexDirection: "row",
      borderBottomColor: "#bff0fd",
      backgroundColor: "#bff0fd",
      borderBottomWidth: 1,
      alignItems: "center",
      height: 24,
      textAlign: "center",
      fontStyle: "bold",
      flexGrow: 1,
    },
    description: {
      width: "60%",
      borderRightColor: borderColor,
      borderRightWidth: 1,
    },
    qty: {
      width: "10%",
      borderRightColor: borderColor,
      borderRightWidth: 1,
    },
    rate: {
      width: "15%",
      borderRightColor: borderColor,
      borderRightWidth: 1,
    },
    amount: {
      width: "15%",
    },
  });

  const dataGaya = StyleSheet.create({
    page: {
      fontFamily: "Helvetica",
      fontSize: 11,
      paddingTop: 30,
      paddingLeft: 60,
      paddingRight: 60,
      lineHeight: 1.5,
      flexDirection: "column",
    },
    logo: {
      width: 74,
      height: 66,
      marginLeft: "auto",
      marginRight: "auto",
    },
    titleContainer: {
      flexDirection: "row",
      marginTop: 24,
    },
    reportTitle: {
      color: "#61dafb",
      letterSpacing: 4,
      fontSize: 25,
      textAlign: "center",
      textTransform: "uppercase",
    },
    invoiceNoContainer: {
      flexDirection: "row",
      marginTop: 36,
      justifyContent: "flex-end",
    },
    invoiceDateContainer: {
      flexDirection: "row",
      justifyContent: "flex-end",
    },
    invoiceDate: {
      fontSize: 12,
      fontStyle: "bold",
    },
    label: {
      width: 60,
    },
    headerContainer: {
      marginTop: 36,
    },
    billTo: {
      marginTop: 10,
      paddingBottom: 3,
      fontFamily: "Helvetica-Oblique",
    },
    tableContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: 24,
      borderWidth: 1,
      borderColor: "#bff0fd",
    },
  });

  const stylesTableRow = StyleSheet.create({
    row: {
      flexDirection: "row",
      borderBottomColor: "#bff0fd",
      borderBottomWidth: 1,
      alignItems: "center",
      height: 24,
      fontStyle: "bold",
    },
    description: {
      width: "60%",
      textAlign: "left",
      borderRightColor: borderColor,
      borderRightWidth: 1,
      paddingLeft: 8,
    },
    qty: {
      width: "10%",
      borderRightColor: borderColor,
      borderRightWidth: 1,
      textAlign: "right",
      paddingRight: 8,
    },
    rate: {
      width: "15%",
      borderRightColor: borderColor,
      borderRightWidth: 1,
      textAlign: "right",
      paddingRight: 8,
    },
    amount: {
      width: "15%",
      textAlign: "right",
      paddingRight: 8,
    },
  });

  const stylesTableBlankSpace = StyleSheet.create({
    row: {
      flexDirection: "row",
      borderBottomColor: "#bff0fd",
      borderBottomWidth: 1,
      alignItems: "center",
      height: 24,
      fontStyle: "bold",
      color: "white",
    },
    description: {
      width: "60%",
      borderRightColor: borderColor,
      borderRightWidth: 1,
    },
    qty: {
      width: "10%",
      borderRightColor: borderColor,
      borderRightWidth: 1,
    },
    rate: {
      width: "15%",
      borderRightColor: borderColor,
      borderRightWidth: 1,
    },
    amount: {
      width: "15%",
    },
  });

  const stylesTableFooter = StyleSheet.create({
    row: {
      flexDirection: "row",
      borderBottomColor: "#bff0fd",
      borderBottomWidth: 1,
      alignItems: "center",
      height: 24,
      fontSize: 12,
      fontStyle: "bold",
    },
    description: {
      width: "85%",
      textAlign: "right",
      borderRightColor: borderColor,
      borderRightWidth: 1,
      paddingRight: 8,
    },
    total: {
      width: "15%",
      textAlign: "right",
      paddingRight: 8,
    },
  });

  const stylesThnkyouMessage = StyleSheet.create({
    titleContainer: {
      flexDirection: "row",
      marginTop: 12,
    },
    reportTitle: {
      fontSize: 15,
      fontStyle: "italic",
      fontWeight: "light",
    },
  });

  const InvoiceTitle = () => (
    <View style={dataGaya.titleContainer}>
      <Text style={dataGaya.reportTitle}>Invoice Pembayaran</Text>
    </View>
  );

  const InvoiceNo = () => (
    <Fragment>
      <View style={dataGaya.invoiceNoContainer}>
        <Text style={dataGaya.label}>Invoice No:</Text>
        <Text style={dataGaya.invoiceDate}>1</Text>
      </View>
      <View style={dataGaya.invoiceDateContainer}>
        <Text style={dataGaya.label}>Date: </Text>
        <Text>07 Februari 2023</Text>
      </View>
    </Fragment>
  );

  const BillTo = () => (
    <View style={dataGaya.headerContainer}>
      <Text style={dataGaya.billTo}>Kepada Yth :</Text>
      <Text>{tujuan}</Text>
      <Text></Text>
      <Text style={dataGaya.billTo}>Keterangan :</Text>
      <Text>{proses}</Text>
    </View>
  );

  //https://kags.me.ke/post/generate-dynamic-pdf-incoice-using-react-pdf/

  const InvoiceTableHeader = () => (
    <View style={stylesTableHeader.container}>
      <Text style={stylesTableHeader.description}>Item Description</Text>
      <Text style={stylesTableHeader.qty}>Qty</Text>
      <Text style={stylesTableHeader.rate}>@</Text>
      <Text style={stylesTableHeader.amount}>Amount</Text>
    </View>
  );

  const InvoiceTableRow = ({ items }) => {
    const rows = resultInvoice.map((data) => (
      <View style={stylesTableRow.row} key={data.id}>
        <Text style={stylesTableRow.description}>{data.keterangan}</Text>
        <Text style={stylesTableRow.qty}>{data.quantity}</Text>
        <Text style={stylesTableRow.rate}>
          {numberFormatter.format(data.hargaSatuan)}
        </Text>
        <Text style={stylesTableRow.amount}>
          {numberFormatter.format(data.jumlah)}
          {/* {(item.qty * item.rate).toFixed(2)} */}
        </Text>
      </View>
    ));
    return <Fragment>{rows}</Fragment>;
  };

  const InvoiceTableBlankSpace = ({ rowsCount }) => {
    const blankRows = Array(rowsCount).fill(0);
    const rows = blankRows.map((x, i) => (
      <View style={stylesTableBlankSpace.row} key={`BR${i}`}>
        <Text style={stylesTableBlankSpace.description}>-</Text>
        <Text style={stylesTableBlankSpace.qty}>-</Text>
        <Text style={stylesTableBlankSpace.rate}>-</Text>
        <Text style={stylesTableBlankSpace.amount}>-</Text>
      </View>
    ));
    return <Fragment>{rows}</Fragment>;
  };

  const InvoiceTableFooter = ({ items }) => {
    // const total = items
    //   .map((item) => item.qty * item.rate)
    //   .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return (
      <View style={stylesTableFooter.row}>
        <Text style={stylesTableFooter.description}>TOTAL</Text>
        <Text style={stylesTableFooter.total}>
          {numberFormatter.format(total)}
          {/* {Number.parseFloat(total).toFixed(2)} */}
        </Text>
      </View>
    );
  };

  const InvoiceThankYouMsg = () => (
    <View style={stylesThnkyouMessage.titleContainer}>
      <Text style={stylesThnkyouMessage.reportTitle}>
        Terbilang : {angkaTerbilangJs(total)} rupiah
      </Text>
    </View>
  );

  const InvoiceItemsTable = () => (
    <View style={styles.tableContainer}>
      <InvoiceTableHeader />
      <InvoiceTableRow />
      <InvoiceTableBlankSpace />
      <InvoiceTableFooter />
    </View>
  );

  const MyDocument = () => {
    return (
      <Document>
        <Page size="A4" style={dataGaya.page}>
          <InvoiceTitle title="Invoice" />
          <InvoiceNo />
          <BillTo />
          <InvoiceItemsTable />
          <InvoiceThankYouMsg />
        </Page>
      </Document>
    );
  };

  return (
    <div className={styles.main}>
      <div className={styles.description}>
        <p>
          Apps&nbsp;
          <code className={styles.code}>Created Invoice</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>
      <div className={styles.content_body}>
        <div className="row mt-3">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Kepada</label>
                  <input
                    type="text"
                    onChange={(e) => setTujuan(e.target.value)}
                    value={tujuan}
                    className="form-control"
                    placeholder="Masukkan tujuan invoice"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Proses</label>
                  <input
                    type="text"
                    onChange={(e) => setProses(e.target.value)}
                    value={proses}
                    className="form-control"
                    placeholder="Masukkan keterangan Proses"
                    required
                  />
                </div>{" "}
                <hr></hr>
                <h4>Isi Invoice</h4>{" "}
                <div className="mb-3">
                  <label className="form-label">Keterangan</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setKeterangan(e.target.value)}
                    value={keterangan}
                    placeholder="Masukkan keterangan isi invoice"
                    required
                  />
                </div>{" "}
                <div className="mb-3">
                  <label className="form-label">Quantity</label>
                  <input
                    type="number"
                    className="form-control"
                    onChange={(e) => setQuantity(e.target.value)}
                    value={quantity}
                    placeholder="Masukkan quantity isi invoice"
                    required
                  />
                </div>{" "}
                <div className="mb-3 ">
                  <label className="form-label">Harga Satuan</label>
                  <div className="input-group">
                    <span className="input-group-text" id="basic-addon1">
                      Rp.
                    </span>
                    <input
                      type="number"
                      className="form-control"
                      onChange={(e) => setHargaSatuan(e.target.value)}
                      placeholder="Masukkan harga satuan"
                      value={hargaSatuan}
                      required
                    />
                  </div>{" "}
                </div>
                <div className="mb-3">
                  {" "}
                  <button
                    onClick={() => onSubmit()}
                    className="btn btn-warning"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card">
              <div className="card-body">
                <div className="mb-3">
                  {" "}
                  <span>Kepada : </span>
                  <p>{tujuan}</p>
                </div>
                <div className="mb-3">
                  {" "}
                  <span>Proses : </span>
                  <p>{proses}</p>
                </div>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Keterangan</th>
                      <th>Quantity</th>
                      <th>Harga Satuan</th>
                      <th>Jumlah</th>
                      <th>Option</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resultInvoice.map((data) => (
                      <tr key={data.id}>
                        <td>{data.keterangan}</td>
                        <td>{data.quantity}</td>
                        <td>{numberFormatter.format(data.hargaSatuan)}</td>
                        <td>{numberFormatter.format(data.jumlah)}</td>
                        <td>
                          <button className="btn btn-sm btn-danger">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="10"
                              height="10"
                              fill="currentColor"
                              class="bi bi-trash3"
                              viewBox="0 0 16 16"
                            >
                              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <hr></hr>
                <div className="d-flex justify-content-around">
                  <h4>Total</h4>
                  <h4>{numberFormatter.format(total)}</h4>
                </div>
                <div className="mt-5">
                  <span>Terbilang : {angkaTerbilangJs(total)} rupiah</span>
                </div>
                <div className="d-flex justify-content-end">
                  <PDFViewer>
                    <MyDocument />
                  </PDFViewer>
                  {/* <PDFDownloadLink document={<MyDocument />} fileName="Invoice">
                    {({ loading }) =>
                      loading ? (
                        <button className="btn btn-danger btn-sm">
                          Loading Document...
                        </button>
                      ) : (
                        <button className="btn btn-danger btn-sm">
                          Create PDF
                        </button>
                      )
                    }
                  </PDFDownloadLink> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
