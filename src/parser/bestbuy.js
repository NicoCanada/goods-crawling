
const cheerio = require('cheerio')

let content = ''
let $ = null

module.exports = function (html) {
  content = html
  $ = cheerio.load(html)

  let goods = {
    'title': get_title(),
    'brand': get_banner(),
    'description': get_description(),
    'images': get_images(),
    'attr': [],
    'sku': get_sku(),
    'price': get_price()

  }
  return goods
}
/**
 * 获取图片列表
 */
function get_images () {
  let images = []
  let imgs = $('.carousel-inner img')
  imgs.each(function (index, elem) {
    images.push($(this).attr('data-img-path'))
  })
  return images
}
/**
 * 获取商品标题
 */
function get_title () {
  return $('#sku-title').text().trim()
}
/**
 * 获取商品品牌
 */
function get_banner () {
  return ''
}
/**
 * 描述
 */
function get_description (){
    return $('#long-description').text().trim()
}
/**
 * 获取sku
 */
function get_sku () {
  let skus = [];
//   console.log($('#twister>div'))   
  let $skus = $('.variation-wrapper')
  
  if ($skus) {
    $skus.each(function () {
        let sku = {
            'label': '',
            'option': [],
            'code': [],
            'type': '', //【choose(选择框)、dropdown(下拉框)】
            'active': '', //选中项的序号，从0开始
            'available': [], //对应的选项是否可选
        }
        if($(this).find('.variation-header').text().trim() != ''){
            sku.label = $(this).find('.variation-header').text().trim().split(':')[0]
        }

        let $options = $(this).find('ul li')
        if($options){
            $options.each(function(i, elem){
         
                sku.option.push($(this).text().trim())
                // console.log($(this).text().trim())
                // $($('#twister > div')[0]).find('select option').each(function(i,e){console.log($(this).text().trim())})
            })
        }
        // console.log(sku);process.exit();
       skus.push(sku)
    //   console.log($(this).find('div label').text())
    })
  }
  return skus
}
/**
 * 获取价格
 */
function get_price(){
    return $('.item-price').text().trim()
}
