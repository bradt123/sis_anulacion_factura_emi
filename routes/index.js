
const { onGetFacture, onDownload, onGetOrderCode, onProcessFacture } = require('../lib/callServices')

module.exports = (app) => {


let dataAlum = {"data": null}
let codePago = {"codigo": ''}
let dataFacAlum = {"resp": false, "factura": null}
let msg_resp = {"resp": false, "msg": null}

app.locals.dataAlum = dataAlum
app.locals.codePago = codePago
app.locals.dataFacAlum = dataFacAlum
app.locals.msg_resp = msg_resp

app.get('/', (req, res) => {
    res.render('index', 
    {
        title: 'EMI'
    })  
})

app.get('/new-entry', (req, res) => {
    res.render('new-entry', 
    {
        title: 'EMI'
    })  
})

app.post('/new-entry', async (req, res) => {
    
    if (req.body.code == '') {        
        res.status(400).send('Es necesario el order code')        
    } 
    const getData = await onGetOrderCode(req.body)
    if (getData.resp) {
        dataAlum.data = null                                        
        dataAlum.data = JSON.parse(getData.data)                    
        codePago.codigo = req.body.code
    } else {
        dataAlum.data = null
    }
    res.redirect('/') 

})

app.get('/home', (req, res) => {
    res.render('home', 
    {
        title: 'EMI',
        msg: 'Bienvenido'
    })
})

app.get('/get-facture', (req, res) => {
    dataFacAlum.resp = false
    dataFacAlum.factura = null
    res.render('get-facture', 
    {
        title: 'EMI',
        msg: 'Bienvenido'
    })
})


app.post('/get-facture', async (req, res) => {
    
    if (req.body.ci_estudiante=='') {
        res.send('No registro los datos correctamente')
    }else{

    const getData = await onGetFacture(req.body)

    if (getData.length > 0) {
        dataFacAlum.resp =  true                          
        dataFacAlum.factura = getData               
    }else { 
        dataFacAlum.resp =  false
        dataFacAlum.factura = null               
        dataFacAlum.msg = `El alumno con nro de carnet: ${req.body.ci_estudiante}, no tiene facturas emitidas.`
    }           
    res.redirect('/get-facture')               
 

    }
})

app.get('/download/:id', async(req, res) => {
  
    const getData = await onDownload(req.params)
    res.redirect(getData.archivo_generado)   

})

app.get('/processing', (req, res) => {
    res.render('processing', 
    {
        title: 'EMI'
    })
})

app.post('/processing', async (req, res) => {    
    
    const process_service = await onProcessFacture(req.body)
    msg_resp.resp = true
    msg_resp.msg = process_service.msg
    res.redirect('/processing')
    console.log("process_service",process_service.msg)
        
})

module.exports = app
} 



