using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppFpis.Models
{
    public class StavkaZahtevaZaSubvencije
    {
        [Key]
        public int SifraStavkeID { get; set; }
        public int SifraZahtevaID { get; set; }
        public int RedniBroj { get; set; }
        public string VrstaZivotinje { get; set; }
        public int BrojGrla { get; set; }
    }
}
