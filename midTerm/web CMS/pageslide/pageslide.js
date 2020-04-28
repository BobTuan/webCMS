/* Default pageslide, moves to the right */
$jjq("#tree").pageslide();
$jjq("#treeSlide").pageslide({ direction: "right", modal: true });
$jjq("#manageContainer").click(function(e){
    if (e.target.className!="second"){
            $jjq.pageslide.close();
    };
})