"use strict";
let moment = require('moment'),
    Post = require('../models/Post'),
    User = require('../models/User'),
    Comment = require('../models/Comment'),
    Tag = require('../models/Tag'),
    postProxy = require('../db_proxy/post'),
    tagProxy = require('../db_proxy/tag'),
    logger = require('../libs/logger'),
    asyncErrHandle = require('../common/asyncErrHandle');
    // const https = require('https');

    let mongoose = require('mongoose');
    const fs = require('fs');
    var path = require('path');
    let seo = require('../config/seo');


    const IsHoneypot = require('../getApi/honeypot');
const { listenerCount } = require('../models/Tag');

module.exports = {


      searchSinglePage: async (req,res)=>{
        res.render('scam/search', {
            seo: {
                "title": seo.search.title,
                "keywords": seo.search.keywords,
                "description": seo.search.description,
            },
            user: req.user.processUser(req.user),
            messages: {
                  error: req.flash('error'),
                  success: req.flash('success'),
                  info: req.flash('info'),
            }                
        });
      },
      searchPost: async (req,res)=>{
        //const user = req.user;
        let chain = req.body.chain;
        let address = req.body.address;
        logger.debug(` chain:${chain}  address:${address}`)

        let response;
       // read JSON object from file    resolve like  cd

        // let ahoneypotData = await IsHoneypot(address);
        

        // logger.debug('honeypotData'+ ahoneypotData.IsHoneypot);
        // let honeypotData = {"Error":  ahoneypotData};
        // logger.debug('honeypotData'+ JSON.stringify(honeypotData));

        fs.readFile(`${path.resolve(__dirname, '..')}/smart-contract-scam/eth_token.json`, 'utf-8', (err, data) => {
            if (err) {
                throw err;
            }
        
            // parse JSON object
            response = JSON.parse(data.toString());
            response.address = address;
            
            // print JSON object
            

            let scamsArr = response.tokens;
            let isScam = scamsArr.some(function(value,index,arr){
              return value == address
            })

            
            let emptyO={"Error": "", address: address};



            //logger.debug(`response: ${JSON.stringify(response)}`);
            //{"NoLiquidity": true, "IsHoneypot": true, "Error": "execution reverted: ERC721: owner query for nonexistent token", "MaxTxAmount": 0, "MaxTxAmountBNB": 0, "BuyTax": 0.0, "SellTax": 0.0, "BuyGas": 0, "SellGas": 0}
            //if address wrong, return {"message":"Internal Server Error"}
             // honeypotData.address = address;
             //honeypotData.chain = chain;
           // logger.debug(`remoteresponse.Error: ${honeypotData.Error}`);

            // if(response.Error && honeypotData.Error){
            //   response.Error = response.Error + honeypotData.Error
            // }


            logger.debug(`response.error: ${response.Error}`)
            // if(response.IsHoneypot){
                res.render('scam/showOne', {
                    //user: req.user.processUser(req.user),
                    seo: {
                      "title": seo.searchShow.title,
                      "keywords": seo.searchShow.keywords,
                      "description": seo.searchShow.description,
                    },
                    messages: {
                          error: req.flash('error'),
                          success: req.flash('success'),
                          info: req.flash('info'),
                    },
                    response: response.Error ? response : emptyO,
                    isScam: isScam                
                });
            // }else{
    
            // }




        });









        //let url = `https://aywt3wreda.execute-api.eu-west-1.amazonaws.com/default/IsHoneypot?chain=eth&token=${address}`;
        // let response = await axios.create({
        //   url: 'https://aywt3wreda.execute-api.eu-west-1.amazonaws.com/default/IsHoneypot',
        //   method: 'get',
        //   params:{
        //     "chain": 'eth',
        //     "token": address
        //   },
        //   headers:{
        //     "user-agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Mobile Safari/537.36",
        //     ":authority": "aywt3wreda.execute-api.eu-west-1.amazonaws.com",
        //     ":method": "GET",
        //     ":path:": "/default/IsHoneypot?chain=eth&token: "+ address,
        //     ":scheme": "https",
        //     "cookie": "SL_G_WPT_TO=en; SL_GWPT_Show_Hide_tmp=1; SL_wptGlobTipTmp=1",
        //     "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        //     "accept-encoding": "gzip, deflate, br",
        //     "accept-language": "en-US,en;q=0.9",
        //     "cache-control": "max-age=0",

        //   },
        //   //httpsAgent: new https.Agent({ keepAlive: true }),
        // });
        // //logger.debug(`response: ${JSON.stringify(response)}`);
        // //{"NoLiquidity": true, "IsHoneypot": true, "Error": "execution reverted: ERC721: owner query for nonexistent token", "MaxTxAmount": 0, "MaxTxAmountBNB": 0, "BuyTax": 0.0, "SellTax": 0.0, "BuyGas": 0, "SellGas": 0}
        // //if address wrong, return {"message":"Internal Server Error"}
        // response.address = address;
        // response.chain = chain;
        // logger.debug(`response.error: ${JSON.stringify(response)}`);
        // let Error = response.Error || '';
        // // if(response.message=="Internal Server Error"){
        // //     response.Error = 'No data'; 
        // // }

       



        


        // post.save((err,post)=>{
        //         if(err){
        //             logger.error('post save error: ' +  err);
        //             req.flash('error',`there is some errors when save the post ${err}`);
        //             res.redirect('back');
        //         }else{
        //             //new tag and save post
        //             tagProxy.saveSingle(req,res,post);

        //             logger.info(`your post saved successfully: ${post._id}`);
        //             req.flash('success','Your post saved successfully');
        //             res.redirect('/post/show/' + post.title);
        //         }
        // });


        







      },


      searchShow: async (req,res)=>{
        res.render('scam/searchResult', {
            seo: {
              "title": seo.searchShow.title,
              "keywords": seo.searchShow.keywords,
              "description": seo.searchShow.description,
            },
            user: req.user.processUser(req.user),
            messages: {
                  error: req.flash('error'),
                  success: req.flash('success'),
                  info: req.flash('info'),
            },                  

      });

    }


      

}