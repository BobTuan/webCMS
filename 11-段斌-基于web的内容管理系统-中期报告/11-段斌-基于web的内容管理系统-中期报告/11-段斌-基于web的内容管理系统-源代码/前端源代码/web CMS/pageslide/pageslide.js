/* Default pageslide, moves to the right */
$jjq("#treeSlide").pageslide({ direction: "right", modal: true });
$jjq("#tagSlide").pageslide({ direction: "right", modal: true });
$jjq("#manageContainer").click(function(e){
    if (e.target.id!="treeSlide" || e.target.id!="tagSlide"){
            $jjq.pageslide.close();
    };
})
