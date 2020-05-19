using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppFpis.Models
{
    public class ZahtevZaSubvencije
    {
        [Key]
        public int SifraZahtevaID { get; set; }
        public DateTime DatumIzjave { get; set; }
        public DateTime DatumPodnosenja { get; set; }

        public int ZaposlenID { get; set; }
        public int DrzavniOrganID { get; set; }
        public int MestoIzjaveID { get; set; }
        public int? MestoPodnosenjaID { get; set; }

        public Zaposlen Zaposlen { get; set; }
        public DrzavniOrgan DrzavniOrgan { get; set; }
        public Mesto MestoIzjave { get; set; }
        public Mesto MestoPodnosenja { get; set; }

        public ICollection<StavkaZahtevaZaSubvencije> Stavke { get; set; }
    }
}
