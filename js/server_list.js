discord_manager.server_list = function (page) {

    // Prepare Pagination
    const items = Array.from(discord_manager.bot.guilds.cache.keys());

    const pagination = $("<ul>", { class: "pagination  justify-content-center m-0" });
    const tbody = $('<tbody>');

    // Create Page
    $('#app_base').empty().append(

        $("<h3>", {class: "text-center"}).text('Server List'),

        $('<div>', { class: "table-responsive my-3" }).append(
            $("<table>", { class: "table table-striped m-0" }).append(

                // Info
                $("<thead>").append(
                    $("<tr>").append(

                        // Icon
                        $("<th>").text("Icon"),

                        // Name
                        $("<th>").text("Name"),

                        // Region
                        $("<th>").text("Region"),

                        // Users
                        $("<th>").text("Users")

                    )
                ),

                // TBody
                tbody

            )
        ), pagination);
    pagination.paging(items.length, {

        format: discord_manager.pagination.format,
        perpage: 20,
        lapping: 1,
        page: page,
        onSelect: function (page) {

            tbody.empty();

            // Get List
            for (let i = this.slice[0]; i < this.slice[1]; i++) {
                if (items[i]) {

                    const guild = discord_manager.bot.guilds.cache.find(guild => guild.id === items[i]);

                    // Create Itemm
                    tbody.append(
                        $("<tr>").append(

                            // Icon
                            $("<td>").append(
                                $("<img>", { src: guild.iconURL(), alt: guild.name }).css('max-height', 150)
                            ),

                            // Name
                            $("<td>").text(guild.name),

                            // Region
                            $("<td>").text(guild.region),

                            // Users
                            $("<td>").text(guild.memberCount)

                        )
                    );
                    
                }
            }

        },
        onFormat: discord_manager.pagination.onFormat
    });

};