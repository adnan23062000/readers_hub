const { json2xml } = require('xml-js');
const convert = require('json-to-plain-text');




module.exports = {

    contentNegotiate: (req, res, results) => {  
        
        
        if(req.headers.accept === 'application/json'){
            return res.status(200).json({
                success: true,
                data: results
            }); 
        }



        if(req.headers.accept === 'application/xml'){

            const json = JSON.stringify(results);
            const xmlData = json2xml(json, { compact: true, spaces: 4 });

            
            res.set('Content-Type', 'application/xml');
            res.status(200);
            return res.send(xmlData);
        }



        if(req.headers.accept === 'application/text'){

            let formattedString = '';

            for (const obj of results) {
                
                for (const [key, value] of Object.entries(obj)) {
                    formattedString += `${key}: ${value}\n`;
                }

                formattedString +=`\n\n\n`;

            }
            
            res.set('Content-Type', 'application/text');
            res.status(200);
            return res.send(formattedString);
        }



        if(req.headers.accept === 'application/html'){
            
            console.log(results);

            let listItems = '';
            for (const item of results) {
                listItems += `<li>id: ${item.id}
                                username: ${item.userName}
                                email:    ${item.email}
                              </li>`;
            }

            const htmlData = `
                <html>
                    <head>
                        <title>My title</title>
                    </head>
                    <body>
                        <ul>
                            ${listItems}
                        </ul>
                    </body>
                </html>
                `;

            
            res.set('Content-Type', 'application/html');
            res.status(200);
            return res.send(htmlData);
        }

    }


}