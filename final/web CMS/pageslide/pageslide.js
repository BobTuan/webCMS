/* Default pageslide, moves to the right */
$jjq("#treeSlide").pageslide({ direction: "right", modal: true });
$jjq("#tagSlide").pageslide({ direction: "right", modal: true });
$jjq("#rssSlide").pageslide({ direction: "right", modal: true });
$jjq("#manageContainer").click(function(e){
    if (e.target.id!="treeSlide" || e.target.id!="tagSlide"){
            $jjq.pageslide.close();
    };
})
$jjq("#rssContainer").click(function(e){
    if (e.target.id!="rssSlide"){
            $jjq.pageslide.close();
    };
})
function closePageslide(){
    console.log("关闭");
    $jjq.pageslide.close();
}