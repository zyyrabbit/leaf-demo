function setHead() {
    function loadResouce(arr, index, accountId) {
        let item = arr[index];

        let tag = null;
        if (item.indexOf(".css") !== -1) {
            tag = document.createElement("link");
            tag.type = "text/css";
            tag.rel = "stylesheet";
            tag.href = item;
        }
        else {
            tag = document.createElement("script");
            tag.type = "text/javascript";
            tag.src = item;
        }
        tag.onload = function () {
            if (index !== arr.length - 1)
                loadResouce(arr, ++index);
            else
                callExtenalHead();
        }
        document.querySelector("body").appendChild(tag);
    }
    function callExtenalHead() {
        //accountId = accountId || "0fdc965c811b4e61a50e0c1e2ee6f7a0";
        //accountId = window.paasConfig.accountId
        //console.log("accountid:" + accountId);

        let RegionId = sessionStorage.getItem('regionid’');
        console.log("RegionId:" + RegionId)

        let option = {};
        window.layout.init(option);
    }
    //var resouces = window.paasConfig.headerUrls;
    loadResouce(window.paasConfig.headerUrls, 0);
}
export default setHead;