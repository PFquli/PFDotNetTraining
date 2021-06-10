using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PFDotNetTraining.Model;

namespace PFDotNetTraining.Data
{
    public class TrainingContext : DbContext
    {
        public TrainingContext(DbContextOptions<TrainingContext> options) : base(options)
        {
        }

        public DbSet<File> Files { get; set; }

        public DbSet<Folder> Folders { get; set; }

        public DbSet<Account> Accounts { get; set; }
    }
}