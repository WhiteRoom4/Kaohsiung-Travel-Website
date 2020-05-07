/*
從高雄市政府資料開放平台抓取高雄旅遊網的景點資料
https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97
使用chrome 擴充功能 JSONView ，確認資料內容
使用(http://test-cors.org/)測試上述網址是否有 cors ，得到結果是 XHR status: 200，表示有 cors 、可以透過 ajax get json api
*/

var xhr = new XMLHttpRequest();
xhr.open('get','https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97',true);
xhr.send(null);
var data = [];
xhr.onload = function (){
    if(xhr.status == 200){
        console.log('download ok');
        var str = JSON.parse(xhr.responseText);
        data = str.result.records;
    }else{
        console.log('資料錯誤！！');
    }
}



var areaSelect = document.querySelector('.areaSelect');
var areasList = document.querySelector('.areasList');
var title = document.querySelector('.title');



areaSelect.addEventListener('change',areaList);
var inputBtn = document.querySelectorAll('.btn');
for (var i = 0 ; i < inputBtn.length; i++) {
    inputBtn[i].addEventListener('click',areaList); 
}



function areaList(e){
    var array = [];
    var select = e.target.value;
    for (var i = 0;i<data.length;i++){
        if(data[i].Zone == select){
            array.push({
                Ticketinfo:data[i].Ticketinfo,
                Add:data[i].Add,
                Opentime:data[i].Opentime,
                Name:data[i].Name,
                Picture1:data[i].Picture1,
                Tel:data[i].Tel}
            )
        }
    }
    var str = '';
    for (var i = 0;i<array.length;i++){
        str += '<div class="card"><div class="Picture1" ' + 'style="background:url(' + array[i].Picture1 + ')"><div class="Name">'+ array[i].Name +'</div></div><div class="Opentime"><img src="images/icons_clock.png" alt="time" width="16px" height="16px"></img>'+ array[i].Opentime +'</div><div class="Add"><img src="images/icons_pin.png" alt="place" width="16px" height="16px"></img>'+ array[i].Add +'</div><div class="Tel"><img src="images/icons_phone.png" alt="phone" width="16px" height="16px"></img>'+ array[i].Tel +'</div><div class="Ticketinfo"><img src="images/icons_tag.png" alt="tag" width="16px" height="16px"></img>'+ array[i].Ticketinfo +'</div></div>';
    }
    areasList.innerHTML = str;
    title.textContent = select;
}
