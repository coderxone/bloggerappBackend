const fs = require('fs');
var multiple_db = require('../config/multiple_mysql.js');

const generateExport = {

     generateXML:function(){

        let pathArray = [
            "/",
            "/main",
            "/login",
            "/restore",
            "/apply",
            "/applyn",
            "/subscribe",
            "/business",
            "/profile",
            "/blogger",
            "/contactlist",
            "/mytasks",
            "/choose-creator",
            "/business-orders-for-bloggers",
            "/last-bloggers-posts",
            "/chooseway",
            "/about",
            "/video",
            "/creator",
            "/businessintro",
            "/userprofile",
            "/explore_profile",
            "/why",
            "/bloggerlist",
            "/latest-news"
        ];

        multiple_db.query('SELECT * FROM `news` WHERE `status` = ?', [1], function (error, results, fields) {

            for(let i = 0;i < results.length;i++){
                let str = results[i].title;
                str = str.replace(/\s/g,"-").toLowerCase();
                pathArray.push("/" + str + "/" + results[i].id);
            }

            let baseUrl = 'https://echohub.io';

            let xmlCollector = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

            for(let i = 0;i < pathArray.length;i++){
                xmlCollector += '<url><loc>' + baseUrl + pathArray[i] + '</loc></url>';
            }

            xmlCollector += '</urlset>';


            fs.writeFile('/home/coderx/sites/echohub/sitemap.xml', xmlCollector, err => {
                if (err) {
                    console.error(err)
                    return
                }
            //file written successfully
            })
           
          });

    }

}

module.exports = generateExport;


