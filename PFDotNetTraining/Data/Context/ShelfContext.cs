using Microsoft.EntityFrameworkCore;
using PFDotNetTraining.Model;
using System.ComponentModel.DataAnnotations.Schema;

namespace PFDotNetTraining.Data.Context
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
            base.OnModelCreating(modelBuilder);
        }
    }
}