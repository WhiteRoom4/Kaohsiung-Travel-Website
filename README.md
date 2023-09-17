Kaohsiung-Travel-Website
====
* 從高雄市政府資料開放平台抓取高雄旅遊網的景點資料。
  
  https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97
* 使用 http://test-cors.org 測試上述網址是否有 cors ，得到結果是 XHR status : 200，表示有 cors 、可以透過 AJAX get JSON data 。
* 此網路應用程式可以透過下拉式選單或點擊按鈕選擇想查詢的區域，就能顯示對應的景點資料。
  
  
  ### 2023.09.17 更新專案
* 替換已失效的資料來源
* 下拉選單新增"全部區域"
* 新增分頁功能  
  
  原先從高雄市政府資料開放平台抓取高雄旅遊網的景點資料，目前該資源已失效   
現在改成抓取六角學院 https://courses.hexschool.com/courses/670031/lectures/11949412 高雄旅遊網 JSON：  
https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json
