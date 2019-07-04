$(document).ready(function() {
     $.ajax({
        url: "https://indoindians.com/api", data: "", dataType: 'json', success: function(rows)
        {
            //mengosongkan data localStorage
            localStorage.setItem("product","");
            var fabelio = rows.products;
            //menyimpan data local storage
            localStorage.setItem("product",JSON.stringify(fabelio));
            for (var i in fabelio)
            {
                var row = fabelio[i];
                var nama = row.name;
                var deskripsi = row.description;
                deskripsi = deskripsi.substring(0, 144)+"...";
                var furnitur = row.furniture_style;
                var harga = numberWithCommas(row.price);
                var pengiriman = row.delivery_time;
                $('#dataproduct').append("<div class='col-lg-6'><div class='product-box'><div class='wfull'><div class='title-product'><h5>"+nama+"</h5></div><div class='price-product'><h6>"+harga+" IDR</h6></div></div><div class='wfull'><span class='description'>"+deskripsi+"</span><span class='furniture-style'>"+furnitur+"</span><span class='delivery-days underline'>Delivery days: "+pengiriman+" Day</span></div></div></div>");
            }  
        },
        error: function(rows)
        {
          console.log(rows);
        }
      });
});
/* Penulisan koma pada Price */
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function searchBox(){

	//Furniture Function
    var checkstyle = document.getElementsByName('furniture_style[]');
    var fstyle = "";
    for (var i=0, n=checkstyle.length;i<n;i++)
    {
    	if (checkstyle[i].checked)
    	{
    		fstyle += ","+checkstyle[i].value;
    	}
    }
    if (fstyle) fstyle = fstyle.substring(1);

    var hasilstyle = fstyle.split(",");

	//Delivery function
    var checkdelivery = document.getElementsByName('delivery[]');
    var ddays = "";
    for (var i=0, n=checkdelivery.length;i<n;i++) 
    {
        if (checkdelivery[i].checked) 
        {
            ddays += ","+checkdelivery[i].value;
        }
    }
    if (ddays) ddays = ddays.substring(1);

    var hasilhari = ddays.split(",");

    //Serch Furniture Textbox
    var searchtext = document.getElementById("search-products").value; 

    var product = localStorage.getItem("product");
    var products =  JSON.parse(product);
    $('#dataproduct').html("");
    var sfurniture = searchtext.toLowerCase();
    for (var i in products)
    {
        var row = products[i];
        var nama = row.name;
        var deskripsi = row.description;
        deskripsi = deskripsi.substring(0, 144)+"...";
        var furnitur = row.furniture_style;
        var harga = numberWithCommas(row.price);
        var pengiriman = row.delivery_time;
        if(pengiriman <= 7){
            var pengiriman2 = "1 Week";
        }
        else if ((pengiriman <= 14) && (pengiriman > 7)){
            var pengiriman2 = "2 Week";
        }
        else if ((pengiriman <= 30) && (pengiriman > 14)){
            var pengiriman2 = "1 Month";
        }
        else{
            var pengiriman2 = "More";
        }

        //kondisi textbox kosong dan checkbox pengirim berisi dan checkbox style kosong
        if((searchtext=="") && (hasilhari[0]!="") && (hasilstyle[0])=="")
        {
            if(hasilhari.includes(pengiriman2)==true){
                $('#dataproduct').append("<div class='col-lg-6'><div class='product-box'><div class='wfull'><div class='title-product'><h5>"+nama+"</h5></div><div class='price-product'><h6>"+harga+" IDR</h6></div></div><div class='wfull'><span class='description'>"+deskripsi+"</span><span class='furniture-style'>"+furnitur+"</span><span class='delivery-days underline'>Delivery days: "+pengiriman+" Day</span></div></div></div>");
            }
        }
        //kondisi textbox kosong , checkbox pengiriman kosong, dan checkbox furnitur style berisi
        else if((searchtext=="") && (hasilhari[0]=="") && (hasilstyle[0]!=""))
        {
        	var furnitur2 = furnitur.toString();
        	var furnitur3 = furnitur2.split(",");
        	for (var i=0, n=furnitur3.length;i<n;i++) 
            {
            	if(hasilstyle.includes(furnitur3[i])==true)
            	{
            		$('#dataproduct').append("<div class='col-lg-6'><div class='product-box'><div class='wfull'><div class='title-product'><h5>"+nama+"</h5></div><div class='price-product'><h6>"+harga+" IDR</h6></div></div><div class='wfull'><span class='description'>"+deskripsi+"</span><span class='furniture-style'>"+furnitur+"</span><span class='delivery-days underline'>Delivery days: "+pengiriman+" Day</span></div></div></div>");
            	}
            }
        }
        //kondisi textbox berisi , checkbox pengiriman kosong, dan checkbox furnitur style berisi
        else if((searchtext!="") && (hasilhari[0]=="") && (hasilstyle[0]!=""))
        {
        	if (nama.toLowerCase().indexOf(sfurniture) > -1)
            {
	        	var furnitur2 = furnitur.toString();
	        	var furnitur3 = furnitur2.split(",");
	        	for (var i=0, n=furnitur3.length;i<n;i++) 
	            {
	            	if(hasilstyle.includes(furnitur3[i])==true)
	            	{
	            		$('#dataproduct').append("<div class='col-lg-6'><div class='product-box'><div class='wfull'><div class='title-product'><h5>"+nama+"</h5></div><div class='price-product'><h6>"+harga+" IDR</h6></div></div><div class='wfull'><span class='description'>"+deskripsi+"</span><span class='furniture-style'>"+furnitur+"</span><span class='delivery-days underline'>Delivery days: "+pengiriman+" Day</span></div></div></div>");
	            	}
	            }
	        }
        }
        //kondisi textbox kosong , checkbox pengiriman berisi, dan checkbox furnitur style berisi
        else if((searchtext=="") && (hasilhari[0]!="") && (hasilstyle[0]!=""))
        {
        	var furnitur2 = furnitur.toString();
	        var furnitur3 = furnitur2.split(",");
        	for (var i=0, n=furnitur3.length;i<n;i++) 
            {
            	if(hasilstyle.includes(furnitur3[i])==true)
            	{
		        	if(hasilhari.includes(pengiriman2)==true){
                        $('#dataproduct').append("<div class='col-lg-6'><div class='product-box'><div class='wfull'><div class='title-product'><h5>"+nama+"</h5></div><div class='price-product'><h6>"+harga+" IDR</h6></div></div><div class='wfull'><span class='description'>"+deskripsi+"</span><span class='furniture-style'>"+furnitur+"</span><span class='delivery-days underline'>Delivery days: "+pengiriman+" Day</span></div></div></div>");
                    }
		        }
		    }
        }
        //kondisi textbox berisi dan checkbox pengiriman berisi dan checkbox style kosong
        else if((searchtext!="") && (hasilhari[0]!="") && (hasilstyle[0]==""))
        {
            if (nama.toLowerCase().indexOf(sfurniture) > -1)
            {
                if(hasilhari.includes(pengiriman2)==true){
                    $('#dataproduct').append("<div class='col-lg-6'><div class='product-box'><div class='wfull'><div class='title-product'><h5>"+nama+"</h5></div><div class='price-product'><h6>"+harga+" IDR</h6></div></div><div class='wfull'><span class='description'>"+deskripsi+"</span><span class='furniture-style'>"+furnitur+"</span><span class='delivery-days underline'>Delivery days: "+pengiriman+" Day</span></div></div></div>");
                }
            }
        }
        //kondisi textbox berisi , checkbox pengiriman berisi, dan checkbox furnitur style berisi
        else if((searchtext!="") && (hasilhari[0]!="") && (hasilstyle[0]!=""))
        {
        	if (nama.toLowerCase().indexOf(sfurniture) > -1)
            {
	        	var furnitur2 = furnitur.toString();
	        	var furnitur3 = furnitur2.split(",");
	        	for (var i=0, n=furnitur3.length;i<n;i++) 
	            {
	            	if(hasilstyle.includes(furnitur3[i])==true)
	            	{
	            		if(hasilhari.includes(pengiriman2)==true){
                            $('#dataproduct').append("<div class='col-lg-6'><div class='product-box'><div class='wfull'><div class='title-product'><h5>"+nama+"</h5></div><div class='price-product'><h6>"+harga+" IDR</h6></div></div><div class='wfull'><span class='description'>"+deskripsi+"</span><span class='furniture-style'>"+furnitur+"</span><span class='delivery-days underline'>Delivery days: "+pengiriman+" Day</span></div></div></div>");
                        }
	            	}
	            }
	        }	
        }
        ////kondisi bila textbox berisi dan checkbox pengiriman kosong dan checkbox style kosong
        else if((searchtext!="") && (hasilhari[0]=="") && (hasilstyle[0]==""))
        {
        	if (nama.toLowerCase().indexOf(sfurniture) > -1)
                {
                    $('#dataproduct').append("<div class='col-lg-6'><div class='product-box'><div class='wfull'><div class='title-product'><h5>"+nama+"</h5></div><div class='price-product'><h6>"+harga+" IDR</h6></div></div><div class='wfull'><span class='description'>"+deskripsi+"</span><span class='furniture-style'>"+furnitur+"</span><span class='delivery-days underline'>Delivery days: "+pengiriman+" Day</span></div></div></div>");   
                }
        }
        //Kondisi ketiga nya kosong
        else
        {
             $('#dataproduct').append("<div class='col-lg-6'><div class='product-box'><div class='wfull'><div class='title-product'><h5>"+nama+"</h5></div><div class='price-product'><h6>"+harga+" IDR</h6></div></div><div class='wfull'><span class='description'>"+deskripsi+"</span><span class='furniture-style'>"+furnitur+"</span><span class='delivery-days underline'>Delivery days: "+pengiriman+" Day</span></div></div></div>");   
        }
    }

}

/* Multiple Select style */
var expanded = false;
var expanded2 = false;

function showCheckboxes() {
  var cekhari = document.getElementById("checkdelivery");
  if (!expanded) {
    cekhari.style.display = "block";
    expanded = true;
  } else {
    cekhari.style.display = "none";
    expanded = false;
  }
}
function showCheckboxesStyle() {
  var cekmodel = document.getElementById("checkstyle");
  if (!expanded2) {
    cekmodel.style.display = "block";
    expanded2 = true;
  } else {
    cekmodel.style.display = "none";
    expanded2 = false;
  }
}
