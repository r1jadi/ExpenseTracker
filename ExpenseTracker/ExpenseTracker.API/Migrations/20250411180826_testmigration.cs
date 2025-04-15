using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ExpenseTracker.API.Migrations
{
    /// <inheritdoc />
    public partial class testmigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Players_Teams_TeamId",
                table: "Players");

            migrationBuilder.RenameColumn(
                name: "TeamId",
                table: "Teams",
                newName: "TeamID");

            migrationBuilder.RenameColumn(
                name: "TeamId",
                table: "Players",
                newName: "TeamID");

            migrationBuilder.RenameColumn(
                name: "PlayerId",
                table: "Players",
                newName: "PlayerID");

            migrationBuilder.RenameIndex(
                name: "IX_Players_TeamId",
                table: "Players",
                newName: "IX_Players_TeamID");

            migrationBuilder.AlterColumn<int>(
                name: "Number",
                table: "Players",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.UpdateData(
                table: "Players",
                keyColumn: "PlayerID",
                keyValue: 1,
                column: "Number",
                value: 30);

            migrationBuilder.UpdateData(
                table: "Players",
                keyColumn: "PlayerID",
                keyValue: 2,
                columns: new[] { "BirthYear", "Name", "Number" },
                values: new object[] { 1992, "Neymar", 10 });

            migrationBuilder.InsertData(
                table: "Players",
                columns: new[] { "PlayerID", "BirthYear", "Name", "Number", "TeamID" },
                values: new object[,]
                {
                    { 3, 1998, "Mbappe", 7, 2 },
                    { 4, 1988, "Busquets", 5, 1 },
                    { 5, 1987, "Pique", 3, 1 },
                    { 6, 1992, "Verrati", 6, 2 }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Players_Teams_TeamID",
                table: "Players",
                column: "TeamID",
                principalTable: "Teams",
                principalColumn: "TeamID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Players_Teams_TeamID",
                table: "Players");

            migrationBuilder.DeleteData(
                table: "Players",
                keyColumn: "PlayerID",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Players",
                keyColumn: "PlayerID",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Players",
                keyColumn: "PlayerID",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Players",
                keyColumn: "PlayerID",
                keyValue: 6);

            migrationBuilder.RenameColumn(
                name: "TeamID",
                table: "Teams",
                newName: "TeamId");

            migrationBuilder.RenameColumn(
                name: "TeamID",
                table: "Players",
                newName: "TeamId");

            migrationBuilder.RenameColumn(
                name: "PlayerID",
                table: "Players",
                newName: "PlayerId");

            migrationBuilder.RenameIndex(
                name: "IX_Players_TeamID",
                table: "Players",
                newName: "IX_Players_TeamId");

            migrationBuilder.AlterColumn<string>(
                name: "Number",
                table: "Players",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.UpdateData(
                table: "Players",
                keyColumn: "PlayerId",
                keyValue: 1,
                column: "Number",
                value: "30");

            migrationBuilder.UpdateData(
                table: "Players",
                keyColumn: "PlayerId",
                keyValue: 2,
                columns: new[] { "BirthYear", "Name", "Number" },
                values: new object[] { 1980, "Cristiano Ronaldo", "30" });

            migrationBuilder.AddForeignKey(
                name: "FK_Players_Teams_TeamId",
                table: "Players",
                column: "TeamId",
                principalTable: "Teams",
                principalColumn: "TeamId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
