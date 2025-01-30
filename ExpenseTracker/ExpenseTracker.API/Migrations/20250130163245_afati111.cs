using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ExpenseTracker.API.Migrations
{
    /// <inheritdoc />
    public partial class afati111 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Players_Teams_TeamId",
                table: "Players");

            migrationBuilder.DropForeignKey(
                name: "FK_Players_Teams_TeamId1",
                table: "Players");

            migrationBuilder.DropIndex(
                name: "IX_Players_TeamId1",
                table: "Players");

            migrationBuilder.DropColumn(
                name: "TeamId1",
                table: "Players");

            migrationBuilder.AddForeignKey(
                name: "FK_Players_Teams_TeamId",
                table: "Players",
                column: "TeamId",
                principalTable: "Teams",
                principalColumn: "TeamId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Players_Teams_TeamId",
                table: "Players");

            migrationBuilder.AddColumn<int>(
                name: "TeamId1",
                table: "Players",
                type: "int",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Players",
                keyColumn: "PlayerId",
                keyValue: 1,
                column: "TeamId1",
                value: null);

            migrationBuilder.UpdateData(
                table: "Players",
                keyColumn: "PlayerId",
                keyValue: 2,
                column: "TeamId1",
                value: null);

            migrationBuilder.CreateIndex(
                name: "IX_Players_TeamId1",
                table: "Players",
                column: "TeamId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Players_Teams_TeamId",
                table: "Players",
                column: "TeamId",
                principalTable: "Teams",
                principalColumn: "TeamId");

            migrationBuilder.AddForeignKey(
                name: "FK_Players_Teams_TeamId1",
                table: "Players",
                column: "TeamId1",
                principalTable: "Teams",
                principalColumn: "TeamId");
        }
    }
}
