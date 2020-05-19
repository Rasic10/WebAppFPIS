using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAppFpis.Models;

namespace WebAppFpis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ZahtevZaSubvencijeController : ControllerBase
    {
        private readonly MlekaraSaruljaContext _context;

        public ZahtevZaSubvencijeController(MlekaraSaruljaContext context)
        {
            _context = context;
        }

        // GET: api/ZahtevZaSubvencije
        [HttpGet]
        public IEnumerable<ZahtevZaSubvencije> GetZahtevZaSubvencije()
        {

            return _context.ZahtevZaSubvencije
                .Include(zahtev => zahtev.DrzavniOrgan)
                    .ThenInclude(mesto => mesto.Adresa)
                .Include(zahtev => zahtev.Zaposlen)
                .Include(mesto => mesto.MestoIzjave)
                .Include(mesto => mesto.MestoPodnosenja)
                .Include(stavke => stavke.Stavke);
                
        }

        // GET: api/ZahtevZaSubvencije/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetZahtevZaSubvencije([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var zahtevZaSubvencije = _context.ZahtevZaSubvencije
                .Where(zahtev => zahtev.SifraZahtevaID == id)
                .Include(zahtev => zahtev.DrzavniOrgan)
                    .ThenInclude(mesto => mesto.Adresa)
                .Include(zahtev => zahtev.Zaposlen)
                .Include(mesto => mesto.MestoIzjave)
                .Include(mesto => mesto.MestoPodnosenja)
                .Include(stavke => stavke.Stavke);

            if (zahtevZaSubvencije == null)
            {
                return NotFound();
            }

            return Ok(zahtevZaSubvencije);
        }

        // PUT: api/ZahtevZaSubvencije/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutZahtevZaSubvencije([FromRoute] int id, [FromBody] ZahtevZaSubvencije zahtevZaSubvencije)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != zahtevZaSubvencije.SifraZahtevaID)
            {
                return BadRequest();
            }

            _context.Entry(zahtevZaSubvencije).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ZahtevZaSubvencijeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ZahtevZaSubvencije
        [HttpPost]
        public async Task<IActionResult> PostZahtevZaSubvencije([FromBody] ZahtevZaSubvencije zahtevZaSubvencije)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // 

            _context.ZahtevZaSubvencije.Add(zahtevZaSubvencije);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetZahtevZaSubvencije", new { id = zahtevZaSubvencije.SifraZahtevaID }, zahtevZaSubvencije);
        }

        // DELETE: api/ZahtevZaSubvencije/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteZahtevZaSubvencije([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var zahtevZaSubvencije = await _context.ZahtevZaSubvencije.FindAsync(id);
            if (zahtevZaSubvencije == null)
            {
                return NotFound();
            }

            _context.ZahtevZaSubvencije.Remove(zahtevZaSubvencije);
            await _context.SaveChangesAsync();

            return Ok(zahtevZaSubvencije);
        }

        private bool ZahtevZaSubvencijeExists(int id)
        {
            return _context.ZahtevZaSubvencije.Any(e => e.SifraZahtevaID == id);
        }
    }
}