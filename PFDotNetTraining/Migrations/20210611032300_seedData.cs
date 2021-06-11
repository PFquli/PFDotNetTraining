using Microsoft.EntityFrameworkCore.Migrations;

namespace PFDotNetTraining.Migrations
{
    public partial class seedData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsEmpty",
                table: "Item",
                newName: "IsFile");

            migrationBuilder.InsertData(
                table: "Item",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "Extension", "Icon", "IsFile", "ModifiedAt", "ModifiedBy", "Name", "Parent" },
                values: new object[] { 1, "Employer", "10/06/2021", ".docx", null, true, "10/06/2021", "Employer", "Contract", "root" });

            migrationBuilder.InsertData(
                table: "Item",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "Extension", "Icon", "IsFile", "ModifiedAt", "ModifiedBy", "Name", "Parent" },
                values: new object[] { 2, "Employer", "10/06/2021", null, null, false, "10/06/2021", "Employer", "Documents", "root" });

            migrationBuilder.InsertData(
                table: "Item",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "Extension", "Icon", "IsFile", "ModifiedAt", "ModifiedBy", "Name", "Parent" },
                values: new object[] { 3, "Employee", "11/06/2021", ".docx", null, true, "11/06/2021", "Employee", "Transcipt", "2" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Item",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.RenameColumn(
                name: "IsFile",
                table: "Item",
                newName: "IsEmpty");
        }
    }
}
