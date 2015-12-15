function creatQrcode(target, url, title, width, width) {
    jQuery(target).qrcode({
        text: url,
        width: width,
        height: width
    });
    $("#qr_webname").text(title);
    $("#qr_website").text(url);

}
//提示信息
function showMsg(msg) {
    $("#J_msg").html(msg).animate({
        marginTop: '0px',
        opacity: '1'
    });
    setTimeout(function() {
        $("#J_msg").animate({
            marginTop: '-28px',
            opacity: '0'
        }).html('');
    }, 1500);
}
jQuery(function() {
    $("#qr_a").click(function() {
        chrome.tabs.create({
            selected: true,
            url: "http://www.ocsen.wang"
        });
    });
    //点击自动生成
    $("#J_creatQr").click(function() {
        var url = $('#J_userUrl').val();
        if (url !== '') {
            $('canvas').remove();
            creatQrcode('#qrDiv', url, '用户自定义网站', '160', '160');
            creatQrcode('#qrDivHight', url, '用户自定义网站', '320', '320');
        } else {
            showMsg('请输入网址！')
        }
    });

    $('#qrDiv').click(function() {
        $('#qrDivHight').show();
    });

    $('#qrDivHight').click(function() {
        $(this).hide();
    });
});

chrome.tabs.getSelected(null, function(w) {
    creatQrcode('#qrDiv', w.url, w.title, '160', '160');
    creatQrcode('#qrDivHight', w.url, w.title, '320', '320');
});
