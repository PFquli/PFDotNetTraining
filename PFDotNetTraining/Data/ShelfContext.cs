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
        }
    }
}