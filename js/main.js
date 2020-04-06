// Start System
const startSystem = function () {

    // Load
    $.LoadingOverlay("show", { background: "rgba(0,0,0, 0.5)" });
    const bot = new Discord.Client({ autoReconnect: true });

    // Ready
    bot.on('ready', (event) => {

        console.log(`Discord Logged in as ${bot.user.tag}!`);

    });

    // Reconnect
    bot.on('disconnect', (erMsg, code) => {
        console.error(`${erMsg}! Code: ${code}`);
    });

    // Error

    bot.on('error', (erMsg) => {
        console.error(erMsg);
    });

    // Warn
    bot.on('warn', (erMsg) => {
        console.warn(erMsg);
    });

    // Save Login
    if (typeof (Storage) !== "undefined") {
        if ($("#remember_token").is(":checked")) {
            localStorage.setItem("discord_token", $("#discord_token").val());
        } else {
            localStorage.removeItem("discord_token");
        }
    }

    // Login
    bot.login($("#discord_token").val()).then(function () {

        // Start Page
        $.LoadingOverlay("hide");
        $("#app").fadeOut(500, function () {

            $(this).empty().removeClass('centerDiv').addClass('container').append(

                // Navbar
                $("<nav>", { class: "navbar navbar-expand-lg navbar-light bg-light" }).append(

                    // Buttons
                    $("<a>", { class: "navbar-brand", href: "#" }).text("Debug Discord.JS"),
                    $("<button>", { class: "navbar-toggler", type: "button", 'data-toggle': "collapse", 'data-target': "#navbarSupportedContent", 'aria-controls': "navbarSupportedContent", 'aria-expanded': false }).append(
                        $("<span>", { class: "navbar-toggler-icon" })
                    ),

                    // Menu
                    $("<div>", { class: "collapse navbar-collapse", id: "navbarSupportedContent" }).append(

                        

                    )

                )

            );

            $(this).fadeIn(500);

        });

    }).catch(function (err) {
        $.LoadingOverlay("hide");
        alert(err.message);
    });

};

// Start
jQuery(function () {

    // Set Login
    $("#start_discord").click(startSystem);
    $("#discord_token").on('keydown', function (ev) {
        if (ev.key === 'Enter') {

            startSystem();

            // Avoid form submit
            return false;
        }
    });

    // Get Storage
    if (typeof (Storage) !== "undefined") {

        const login_token = localStorage.getItem("discord_token");
        if (login_token) {
            $("#remember_token").prop('checked', true);
            $("#discord_token").val(login_token);
        }

    }

});