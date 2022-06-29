
import {Document,Page,Text,View,StyleSheet,PDFViewer, PDFDownloadLink} from "@react-pdf/renderer/lib/react-pdf.browser.cjs";

function PDFFile({children}) {
    const styles = StyleSheet.create({
        page: {
            backgroundColor: "white",
            color: "black",
        },
        section: {
            margin: 10,
            padding: 10,
        },
        
    });

    const Boton = (
        <button className="p-3 bg-blue-600 uppercase text-white">
            Descargar
        </button>
    )
  
    const MyDoc = () => (
            
            <Document>
            
                <Page size="A4" style={styles.page}>
                    <View style={styles.section}>
                        <Text>{children}</Text>
                    </View>
                    <View style={styles.section}>
                        <Text>World</Text>
                    </View>
                </Page>
            </Document>
    )
    return (
        <div>
            <PDFDownloadLink document={<MyDoc />} fileName={`Recibo ${children}`}>
            {({ blob, url, loading, error }) => (loading ? <button className="hidden">Cargando</button> : <button className="bg-blue-500 p-3 uppercase shadow-lg">Descargar recibo</button>)}
            </PDFDownloadLink>
        </div>

    )
    
}

export default PDFFile;