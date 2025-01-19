using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ExpenseTracker.API.Migrations.ExpenseTrackerAuthDb
{
    /// <inheritdoc />
    public partial class AuthMigration1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8dc6ee30-8f2a-47d8-82ae-06a687cfd63c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "bac30be0-d90e-4ff0-acc2-415c485e2145");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6", "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6", "User", "USER" },
                    { "p6o5n4m3-l2k1-j0i9-h8g7-f6e5d4c3b2a1", "p6o5n4m3-l2k1-j0i9-h8g7-f6e5d4c3b2a1", "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "p6o5n4m3-l2k1-j0i9-h8g7-f6e5d4c3b2a1");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "8dc6ee30-8f2a-47d8-82ae-06a687cfd63c", "8dc6ee30-8f2a-47d8-82ae-06a687cfd63c", "Writer", "WRITER" },
                    { "bac30be0-d90e-4ff0-acc2-415c485e2145", "bac30be0-d90e-4ff0-acc2-415c485e2145", "Reader", "READER" }
                });
        }
    }
}
