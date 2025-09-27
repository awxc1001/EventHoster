using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class ReName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Activitiies",
                table: "Activitiies");

            migrationBuilder.RenameTable(
                name: "Activitiies",
                newName: "Activities");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Activities",
                table: "Activities",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Activities",
                table: "Activities");

            migrationBuilder.RenameTable(
                name: "Activities",
                newName: "Activitiies");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Activitiies",
                table: "Activitiies",
                column: "Id");
        }
    }
}
