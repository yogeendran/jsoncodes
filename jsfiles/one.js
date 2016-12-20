var fs=require('fs');
var lineReader = require('readline').createInterface({
 input : fs.createReadStream('../csvfiles/FoodFacts.csv') 
});
var i=0;// For looping purpose
var linearray=[];// To store the csv files line by line
var headerline = 0;// To store only first line of the csv
var cIndex=0,saltIndex=0,sugarIndex=0,fatIndex=0,protienIndex=0,carboIndex=0;//To store the index of required feilds.
var countryArray = ['Netherlands', 'Canada', 'United Kingdom' , 'United States' , 'Australia' , 'France' , 'Germany' , 'Spain', 'South Africa'];//Places given in the assingment
var north = ['United Kingdom', 'Denmark', 'Sweden','Norway'];//Places given in the assingment
var central  = ['France', 'Belgium', 'Germany', 'Switzerland','Netherlands'];//Places given in the assingment
var South = ['Portugal', 'Greece', 'Italy', 'Spain', 'Croatia','Albania'];//Places given in the assingment
var sugarArray = [];//To store sugar data
var saltArray = [];//To store salt data
var northfatArray =0;//To store fat data for north region
var northprotienArray=0;//To store protein data for north region
var northcarboArray =0;//To store carbohydrate data for north region
var cfatArray =0;//To store fat data for central region
var cprotienArray =0;//To store protein data for central region
var ccarboArray =0;//To store carbohydrate data for central region
var sfatArray =0;//To store fat data for south region
var sprotienArray=0;//To store protein data for south region
var scarboArray=0;//To store carbohydrate data for south region
var exist = false,existn=false,existc=false,exists=false;
var jsonArray = [];// Final array part1
var Europe=[];// Final array part2


//To initialize all the data primarily to zero.
for(var i=0;i<countryArray.length;i++)
	{
		sugarArray[i]=0;
		saltArray[i]=0;
	}
for(var i=0;i<north.length;i++)
{
	northfatArray[i]=0;
	northcarboArray[i]=0;
	northprotienArray[i]=0;
}
for(var i=0;i<central.length;i++)
{
	cfatArray[i]=0;
	ccarboArray[i]=0;
	cprotienArray[i]=0;
}
for(var i=0;i<South.length;i++)
{
	sfatArray[i]=0;
	scarboArray[i]=0;
	sprotienArray[i]=0;
}

//Line reading of csv files starts here.
lineReader.on('line',function(line)
{
	linearray = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);//Splitting the csv lines into words of our requirements

	if(headerline==0)//Happens only once and assigns header index.
	{
		cIndex = linearray.indexOf("countries_en");
		saltIndex = linearray.indexOf("salt_100g");
		sugarIndex = linearray.indexOf("sugars_100g");
		protienIndex = linearray.indexOf("proteins_100g");
		carboIndex = linearray.indexOf("carbohydrates_100g");
		fatIndex = linearray.indexOf("fat_100g");
		headerline++;//Done to ensure that only first line is stored in the header
	}	
		exist = countryArray.includes(linearray[cIndex]);	//To check whether the given country name matches with the required country name
		existn = north.includes(linearray[cIndex]);//To check whether the given country name in north region matches with the required country name
		existc = central.includes(linearray[cIndex]);//To check whether the given country name in central region matches with the required country name
		exists = South.includes(linearray[cIndex]);//To check whether the given country name in south region matches with the required country name
	if(exist)
	{
		var index = countryArray.indexOf(linearray[cIndex]);
		var salt = linearray[saltIndex],sugar=linearray[sugarIndex];

		if(salt=="")
			salt=0;// To avoid null values.
		if(sugar=="")
			sugar=0;// To avoid null values.

		saltArray[index] = saltArray[index]+parseFloat(salt);//Adding all the salt consumption by the country
		sugarArray[index] = sugarArray[index]+parseFloat(sugar);//Adding all the sugar consumption by the country
		exist = false;
	}
	if(existn)
	{
		var nfat = linearray[fatIndex],nprotien=linearray[protienIndex],ncarbo=linearray[carboIndex];
		if(nfat=="")
			nfat=0;
		if(ncarbo=="")
			ncarbo=0;
		if(nprotien=="")
			nprotien=0;

		northfatArray+=parseFloat(nfat);//Adding all the fat consumption by the north region
		northcarboArray+=parseFloat(ncarbo);//Adding all the carbohydrate consumption by the north region
		northprotienArray+=parseFloat(nprotien);//Adding all the protein consumption by the north region
		existn=false;
	}
	if(existc)
	{
		var cfat = linearray[fatIndex],cprotien=linearray[protienIndex],ccarbo=linearray[carboIndex];
		if(cfat=="")
			cfat=0;
		if(cprotien=="")
			cprotien=0;
		if(ccarbo=="")
			ccarbo=0;

		cfatArray+=parseFloat(cfat);//Adding all the fat consumption by the north region
		cprotienArray+=parseFloat(cprotien);//Adding all the carbohydrate consumption by the north region
		ccarboArray+=parseFloat(ccarbo);//Adding all the protein consumption by the north region
		existc=false;
	}
	if(exists)
	{
		var sfat = linearray[fatIndex],sprotien=linearray[protienIndex],scarbo=linearray[carboIndex];
		if(sfat=="")
			sfat=0;
		if(sprotien=="")
			sprotien=0;
		if(scarbo=="")
			scarbo=0;

		sfatArray+=parseFloat(sfat);//Adding all the fat consumption by the north region
		sprotienArray+=parseFloat(sprotien);//Adding all the carbohydrate consumption by the north region
		scarboArray+=parseFloat(scarbo);//Adding all the protein consumption by the north region
		exists=false;
	}
	
	});
	lineReader.on('close',function ()     //Writing the file part
	{
		for(var i=0;i<countryArray.length;i++)
		{
			var obj = {};
			obj["country"] = countryArray[i];
			obj["salt"] = saltArray[i];
			obj["sugar"] = sugarArray[i];
			jsonArray.push(obj);//Stores all the info for stacked bar chart file
		}
		
			var nobj = {};
			nobj["country"] = "NorthEurope";
			nobj["Fat"] = northfatArray;
			nobj["Protien"] = northprotienArray;
			nobj["carbohydrates"] = northcarboArray;
			Europe.push(nobj);//Stores the northern region info for multiline series chart

			var cobj= {};
			cobj["country"] = "CentralEurope";
			cobj["Fat"] = cfatArray;
			cobj["Protien"] = cprotienArray;
			cobj["carbohydrates"] = ccarboArray;
			Europe.push(cobj);//Stores the central region info for multiline series chart

			var sobj={};
			sobj["country"] = "SouthEurope";
			sobj["Fat"] = sfatArray;
			sobj["Protien"] = sprotienArray;
			sobj["carbohydrates"] = scarboArray;
			Europe.push(sobj);//Stores the southern region info for multiline series chart

		fs.writeFile('stackedbarchart.json', JSON.stringify(jsonArray,null,"\r\n") , 'utf-8');
		fs.writeFile('multilineserieschart.json',JSON.stringify(Europe,null,"\r\n"),'utf-8');
	});
