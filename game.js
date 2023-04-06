$(document).ready(function(){

    $('#start').text("Start");
    $('#end').hide();

    let gameOn = false;

    let blockCreator = 0;
    let colors = ["blue", "red", "green"];
    let lines = 10;
    let level = 1;
    let score = 0;
    let blocks = [ ];

    // 0,1,2,3 first 4 rows. then comes in 4 to bottom. illogical but works for now.
    let rows = 0;


    $("#start").click(function () {
        initialise();
    });

    $("#end").click(function () {
        gameOn = false;
        $("#start").show();
        $("#end").hide();
        $("#nextLevel").hide();
        $("#gameOver").hide();
        $("#playAgain").hide();

        resetVar();
        handleGameOver();

    });

    $("#nextLevel").click(function () {
        level += 1;
        $("#nextLevel").hide();

        // setting the new lines size
        lines = Math.floor(level * 10 / 1.6);
        blockCreator = setInterval(createBlock, 5);
        updateLabels();

        // regenerating blocks
        $(".cloneMain").remove();
        rows = 0;

        // generating rows based on level
        let startingRows =  3 + level;
        if(startingRows>15){startingRows=15;}

        for (let i = 0; i < startingRows; i++) {
            generateRow(i);
        }

    });

    $("#playAgain").click(function () {

        handleGameOver();
        initialise();

    });

    function initialise()
    {
        $("#end").show();
        $("#start").hide();
        $("#nextLevel").hide();
        $("#gameOver").hide();
        $("#playAgain").hide();

        gameOn = true;

        // setting the main variables
        resetVar();
        updateLabels();

        // generating the first 4 rows
        for (let i = 0; i < 4; i++) {
            generateRow(i);
        }

        rows = 0;
        // $(".block").show();
        blockCreator = setInterval(createBlock, 5);
    }

    function handleGameOver()
    {
        clearInterval(blockCreator);

        clearBottomLine();
        $(".cloneMain").remove();
        rows = 0;

        updateLabels();
    }

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
        //if bottomline is full - create MainLine
        if(obj.length>=15)
        {
            clearBottomLine();
            pushUp();
            lines--;

            generateRowByColor(0,rowColors);

            // if we generated all the lines we wanted that level
            if(lines<0)
            {
                lines = 0;
                clearInterval(blockCreator);
                $("#nextLevel").show();

            }

            // if the main board is full -> GameOver!
            if(rows>20)
            {
                clearInterval(blockCreator);
                $("#gameOver").show();
                $("#playAgain").show();
                gameOn = false;

            }
            updateLabels();

        }

        // createbottomLine
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
        $("#scoreLabel").text("Score: " + score);
        $("#levelLabel").text("Level: " + level);
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