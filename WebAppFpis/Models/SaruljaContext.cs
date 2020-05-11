using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppFpis.Models
{
    public class SaruljaContext : DbContext
    {
        public SaruljaContext(DbContextOptions<SaruljaContext> options) : base(options)
        {

        }

        public DbSet<Obracun> Obracuni { get; set; }
        public DbSet<Mlekara> Mlekare { get; set; }
        public DbSet<Mesto> Mesta { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Obracun>().ToTable("Obracun");
            modelBuilder.Entity<Mlekara>().ToTable("Mlekara");
            modelBuilder.Entity<Mesto>().ToTable("Mesto");
        }
    }
}
