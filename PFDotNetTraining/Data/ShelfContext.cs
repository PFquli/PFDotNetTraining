using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PFDotNetTraining.Model;

namespace PFDotNetTraining.Data
{
    public class ShelfContext : DbContext
    {
        public ShelfContext(DbContextOptions<ShelfContext> options) : base(options)
        {
        }

        public DbSet<Item> Items { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Item>().ToTable("Item");
            modelBuilder.Entity<Item>().HasData(
                new Item() { Id = 1, Name = "Contract", CreatedBy = "Employer", CreatedDate = "10/06/2021", Extension = ".docx", Icon = null, IsFile = true, ModifiedAt = "10/06/2021", ModifiedBy = "Employer", Parent = "root" },
                new Item() { Id = 2, Name = "Documents", CreatedBy = "Employer", CreatedDate = "10/06/2021", Extension = null, Icon = null, IsFile = false, ModifiedAt = "10/06/2021", ModifiedBy = "Employer", Parent = "root" },
                                new Item() { Id = 3, Name = "Transcipt", CreatedBy = "Employee", CreatedDate = "11/06/2021", Extension = ".docx", Icon = null, IsFile = true, ModifiedAt = "11/06/2021", ModifiedBy = "Employee", Parent = "2" }
                );
        }
    }
}