function handleClickSearch(){
    var bName = document.getElementById("bName").value;
    var index = NUSbuildings.indexOf(bName);
    if(index == -1){
        alert("No Buildings Found. Please Enter the right name.");
        document.getElementById("bName").value = '';
    } else {
        var num = buildingTable[bName];
        if(num == 0){
            alert("No one has been diagnosed with COVID-19 during the last 7 days in Building " + bName);
        } else if(num == 1) {
            alert("1 person has been diagnosed with COVID-19 during the last 7 days in Building " + bName);
        } else {
            alert(num + " people have been diagnosed with COVID-19 during the last 7 days in Building " + bName);
        }
    }
    
}