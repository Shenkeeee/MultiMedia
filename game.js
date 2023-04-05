$(document).ready(function(){

    $('#start').text("Start");
    $('#end').hide();

    let gameOn = false;

    let blockCreator = 0;
    let colors = ["blue", "red", "green"];
    let lines = 10;
    let level= 1;
    let score = 0;
    let blocks = [ ];

    // 0,1,2,3 first 4 rows. then comes in 4 to bottom. illogical but works for now.
    let rows = 0;


    $("#start").click(function ()
    {
        // $("#start").text("Restart");

        // $("#pause").show();
        $("#end").show();
        $("#start").hide();
        gameOn = true;

        // setting the main variables
        $("#scoreLabel").text("Score: " + score);
        $("#levelLabel").text("Level: " + level);
        $("#linesLabel").text("Lines: " + lines);

        $("#block2").hide();

        for (let i = 0; i < 4; i++) {
            generateRow(i);
        }

        // $(".block").show();
        blockCreator = setInterval(createBlock, 500);
    });

    $("#end").click(function ()
    {
       gameOn = false;
       $("#start").show();
       $("#end").hide();


       // $(".block").hide();
       // $("#start").text("Start");
        clearInterval(blockCreator);

        clearBottomLine();
        $(".cloneMain").remove();

        resetVar();
        updateLabels();


    });

    function clearBottomLine()
    {
        obj = [];
        kovi = 0;
        $(".cloneBottom").remove();

    }

    // Pause and Resume
    // $("#pause").click(function ()
    // {
    //     $("#resume").show();
    //     $("#pause").hide();
    // });
    //
    // $("#resume").click(function ()
    // {
    //     $("#resume").hide();
    //     $("#pause").show();
    // });


    // if(gameOn===false)
    // {
    //     while (!gameOn)
    //     {}
    //     blockCreator = setInterval(createBlock, 500)
    //
    // }

    let obj = [];
    let kovi = 0;
    let rowColors = [];

    function createBlock()
    {
        //if line is full
        if(obj.length>=15)
        {
            clearBottomLine();
            pushUp();
            lines--;

            generateRowByColor(0,rowColors);

            if(lines<0)
            {
                lines = 0;
                clearInterval(blockCreator);
            }

            updateLabels();

        }

        else
        {
            if(obj.length !== 0)
            {
                kovi = obj.at(length-1)+30;
            }
            // obj.push($(`.block`).position().top+30);

            obj.push(kovi);

            // $(".cloneBottom").show();
            let currentColor = generateColor();
            rowColors[obj.length-1] = currentColor;

            $("#block1").clone().appendTo("#bottomLine").css({left: kovi, background: currentColor}).addClass("cloneBottom").show();
            // $("#block1").append();
            // $("#block1").css({left: kovi});
            // $("#block1").show();


        }

    }

    function generateColor()
    {
        return colors[Math.floor(Math.random() * colors.length)];
    }

    // num means how many rows we need. starting from 0, thats one.
    function generateRow(num)
    {
        blocks[rows] = [];
        let kovi = 0;
        for (let i = 0; i < 15; i++) {


            blocks[rows][i] = $("#block2").clone().appendTo("#main").css({left: kovi, bottom:num*30, background: generateColor()}).addClass("cloneMain").show();

            // console.log(rows + " rows");
            // console.log(i + " i");
            // console.log(blocks[rows][i].css("bottom"));

            kovi += 30;
        }

        rows++;


    }
    function generateRowByColor(num, rowColorss)
    {
        blocks[rows] = [];

        let kovi = 0;
        for (let i = 0; i < 15; i++) {
            blocks[rows][i] = $("#block2").clone().appendTo("#main").css({left: kovi, bottom:num*30, background: rowColorss[i]}).addClass("cloneMain").show();

            // console.log(blocks[rows][i].css("bottom"));

            kovi += 30;
        }
        rowColors = [];
        rows++;

    }

    function updateLabels()
    {
        $("#linesLabel").text("Lines: " + lines);
    }
    function pushUp() {
        $('.cloneMain').each(function() {
            let bottom = parseInt($(this).css('bottom'));
            $(this).css('bottom', bottom + 30 + 'px');
        });

    }

    function resetVar()
    {
        lines = 10;
        level= 1;
        score = 0;
    }

});