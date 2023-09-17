/*
原先從高雄市政府資料開放平台抓取高雄旅遊網的景點資料，目前該資源已失效
https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97

現在改成抓取六角學院(https://courses.hexschool.com/courses/670031/lectures/11949412)高雄旅遊網 JSON
https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json

使用(http://test-cors.org/)測試上述網址是否有 cors ，得到結果是 XHR status: 200，表示有 cors 、可以透過 ajax get json api
*/
var areasList = document.querySelector('.areaSelect');
var xhr = new XMLHttpRequest();
xhr.open('get','https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json',true);
xhr.send(null);
var data = [];
xhr.onload = function (){
    if(xhr.status == 200){
        console.log('download ok');
        var temp = JSON.parse(xhr.responseText);
        data = temp.result.records;
        allArea = [];
        areaName = 
        `
        <option value="---請選擇地區---" disabled selected>---請選擇地區---</option>
        <option value="全部區域">全部區域</option>
        `;
        for (var i = 0; i < data.length; i++){
            allArea.push(data[i].Zone);
        }
        var distinctArea = Array.from(new Set(allArea));
        for (var i = 0; i < distinctArea.length; i++){
            areaName += `<option value="${distinctArea[i]}">${distinctArea[i]}</option>`
        }
        areaSelect.innerHTML = areaName;
    }else{
        console.log('資料錯誤！！');
        alert('伺服器請求發生錯誤，請稍後再試！');
    }
}

var areaSelect = document.querySelector('.areaSelect');
var areasList = document.querySelector('.areasList');
var title = document.querySelector('.title');
var nowArray = [];
function areaList(e){
    var select = e.target.value;
    var array = [];
    if('全部區域' == select){
        for (var i = 0;i<data.length;i++){
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
    else{
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
    }
    nowArray = array;

    // 啟動分頁功能
    currentPage = 1; // 第一個分頁是預設分頁
    var pageLen = document.querySelector('.pageLen');
    pageList = '';
    if(currentPage != 1){
        pageList += `<li class="pageNum" value="-1">&lt; prev</li>` // 設定 prev 對應 value = -1
    }
    else{
        pageList += `<li class="pageNum" value="-1">&lt; prev</li>`
    }
    for (var i = 0;i<array.length/8;i++){ //每一個分頁顯示8筆資料
        if(currentPage != i+1){
            pageList += `<li class="pageNum" value="${i+1}">${i+1}</li>`
        }
        else{
            pageList += `<li class="pageNum selected" value="${i+1}">${i+1}</li>`
        }
    }
    if(currentPage != Math.ceil(array.length/8)){ // Math.ceil 無條件進位
        pageList += `<li class="pageNum" value="-2">next &gt;</li>` // 設定 next 對應 value = -2
    }
    else{
        pageList += `<li class="pageNum" value="-2">next &gt;</li>`
    }
    pageLen.innerHTML = pageList;
    array = array.slice( (currentPage-1)*8 , currentPage*8-1 +1 ); //每一個分頁顯示8筆資料 //slice()第二個參數需要+1，才會擷取到
    var pageNum = document.querySelectorAll('.pageNum');

    pageNum.forEach(item => {
        item.addEventListener('click',changePage);
    });
    //

    str = '';
    for (var i = 0;i<array.length;i++){
        str += '<div class="card"><div class="Picture1" ' + 'style="background:url(' + array[i].Picture1 + ')"><div class="Name">'+ array[i].Name +'</div></div><div class="Opentime"><img src="images/icons_clock.png" alt="time" width="16px" height="16px"></img>'+ array[i].Opentime +'</div><div class="Add"><img src="images/icons_pin.png" alt="place" width="16px" height="16px"></img>'+ array[i].Add +'</div><div class="Tel"><img src="images/icons_phone.png" alt="phone" width="16px" height="16px"></img>'+ array[i].Tel +'</div><div class="Ticketinfo"><img src="images/icons_tag.png" alt="tag" width="16px" height="16px"></img>'+ array[i].Ticketinfo +'</div></div>';
    }
    title.textContent = select;
    areasList.innerHTML = str;
}
areaSelect.addEventListener('change',areaList);
var inputBtn = document.querySelectorAll('.btn');
for (var i = 0 ; i < inputBtn.length; i++) {
    inputBtn[i].addEventListener('click',areaList); 
}

// 啟動分頁功能
function changePage(e){
    if (e.target.value == '-1' && currentPage == 1){
        // 當下是第1個分頁 並 點擊 prev
    }
    else if(e.target.value == '-2' && (currentPage == Math.ceil(nowArray.length/8))){
        // 當下是最後一個分頁 並 點擊 next
    }
    else{
        const items = document.querySelectorAll('.pageNum');
        items.forEach(otherItem => {
            // 移除所有分頁的變色
            otherItem.classList.remove('selected');
          });
        if(e.target.value == '-1'){
            currentPage = currentPage - 1;
        }
        else if(e.target.value == '-2'){ // next
            currentPage = currentPage + 1;
        }
        else{
            currentPage = e.target.value;
        }
        items[currentPage].classList.add('selected'); // 被選取的分頁會變色
        newArray = nowArray.slice( (currentPage-1)*8 , currentPage*8-1 +1 ); //每一個分頁顯示8筆資料 //slice()第二個參數需要+1，才會擷取到
        str = '';
        for (var i = 0;i<newArray.length;i++){
            str += '<div class="card"><div class="Picture1" ' + 'style="background:url(' + newArray[i].Picture1 + ')"><div class="Name">'+ newArray[i].Name +'</div></div><div class="Opentime"><img src="images/icons_clock.png" alt="time" width="16px" height="16px"></img>'+ newArray[i].Opentime +'</div><div class="Add"><img src="images/icons_pin.png" alt="place" width="16px" height="16px"></img>'+ newArray[i].Add +'</div><div class="Tel"><img src="images/icons_phone.png" alt="phone" width="16px" height="16px"></img>'+ newArray[i].Tel +'</div><div class="Ticketinfo"><img src="images/icons_tag.png" alt="tag" width="16px" height="16px"></img>'+ newArray[i].Ticketinfo +'</div></div>';
        }
        areasList.innerHTML = str;
    }
}
//