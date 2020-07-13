using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAppFpis.Models;

namespace WebAppFpis.Models
{
    public class MlekaraSaruljaContext : DbContext
    {  

        public MlekaraSaruljaContext(DbContextOptions<MlekaraSaruljaContext> options) : base(options)
        {
            
        }

        public DbSet<Obracun> Obracuni { get; set; }
        public DbSet<Mlekara> Mlekare { get; set; }
        public DbSet<Mesto> Mesta { get; set; }
        public DbSet<DrzavniOrgan> DrzavniOrgani { get; set; }
        public DbSet<Zaposlen> Zaposleni { get; set; }
        public DbSet<StavkaZahtevaZaSubvencije> StavkaZahtevaZaSubvencija { get; set; }
        public DbSet<ZahtevZaSubvencije> ZahtevZaSubvencije { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Obracun>().ToTable("Obracun");
            modelBuilder.Entity<Mlekara>().ToTable("Mlekara");
            modelBuilder.Entity<Mesto>().ToTable("Mesto");
            modelBuilder.Entity<Zaposlen>().ToTable("Zaposlen");
            modelBuilder.Entity<DrzavniOrgan>().ToTable("DrzavniOrgan");
            modelBuilder.Entity<StavkaZahtevaZaSubvencije>().ToTable("StavkaZahtevaZaSubvencije");
        }

        public DbSet<WebAppFpis.Models.Korisnik> Korisnik { get; set; }
    }
}
