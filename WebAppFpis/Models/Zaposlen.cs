using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppFpis.Models
{
    public class Zaposlen
    {
        [Key]
        public int SifraZaposlenogID { get; set; }
        public int JMBG { get; set; }
        public string Ime { get; set; }
        public string Prezime { get; set; }
    }
}
