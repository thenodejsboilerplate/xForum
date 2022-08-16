/**
 * config
 */

const path = require('path');
const siteName = 'Scam Detector';
var config = {

  home: {
    title: `${siteName} | 区块链行业数据库，有态度的区块链社区`,
    keywords: '区块链导航,区块链网址大全, 区块链创业公司,区块链数据库, 区块链社区,区块链评论,区块链项目,区块链大数据,区块链点评,区块链教程,区块链开发,比特币矿机,以太坊,比特币怎么挖,区块链,比特币是什么,比特币今日价格,比特币交易平台,比特币,bitcoin,比特币网址导航,比特币行情,比特币价格,比特币价格K线图,比特币资讯,比特币挖矿,比特币网址大全, 区块链网址导航',
    description: '210区是全球首家中文区块链行业数据库及有态度的区块链社区。在这里偶遇区块链行业应用，潜力加密货币或优秀ICO项目；我们崇尚去中心化理念，并相信区块链改变世界。'

    //IT互联网公司产品数据库及商业信息服务 
    //及有态度的区块链社区
    //'区块链大数据平台。提供区块链行业（包括区块链项目,虚拟货币等）项目数据, 网址导航, 用户评论和历史记录。' BTC210 is where the world meets Blockchain startups. Find a great blockchain startup job, invest in a blockchain startup, or raise money
  },
  search: {
    title: `Scam Hunter | ${siteName}`,
    keywords: 'scam,Honeypot',
    description: 'Help you staty away from the scam address and secure your investment.'

    //IT互联网公司产品数据库及商业信息服务 
    //及有态度的区块链社区
    //'区块链大数据平台。提供区块链行业（包括区块链项目,虚拟货币等）项目数据, 网址导航, 用户评论和历史记录。' BTC210 is where the world meets Blockchain startups. Find a great blockchain startup job, invest in a blockchain startup, or raise money
  },
  searchShow: {
    title: `Search Result | ${siteName}`,
    keywords: 'scam Detector, honeyPot',
    description: 'Scam Detector Resut'
  },
  square: {
    title: `Project Square | ${siteName}`,
    keywords: 'project hunter, blockchain project, dapp list, dapp project',
    description: 'The safest place for you to find a verified dapp to use.'
  },
  detail: {
    title: '区块链应用', 
    keywords: '',
    description: ''  
  },
  postProject: {
    title: '项目提交',
    keywords: '区块链项目提交,区块链项目审核',
    description: '提交区块链项目, 立即让全世界知道你的项目'
  },
  personalPage: {
    title: '我的页面',
    keywords: '',
    description: '的个人页面',
  },
  login: {
    title: `登录 | ${siteName}`,
    keywords: `登录, 登录${siteName}`,
    description: `登录${siteName}`
  },
  signup: {
    title: `注册 | ${siteName}`,
    keywords: `注册, 注册${siteName}`,
    description: `注册 ${siteName}`
  },
  airdrop: {
    title: `空投项目`
  }
};

module.exports = config;
