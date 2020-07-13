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
    public class ObracunController : ControllerBase
    {
        private readonly MlekaraSaruljaContext _context;

        public ObracunController(MlekaraSaruljaContext context)
        {
            _context = context;
        }

        // GET: api/Obracun
        [HttpGet]
        public IEnumerable<Obracun> GetObracuni()
        {
            return _context.Obracuni.Include(obracun => obracun.Mlekara);
        }

        // GET: api/Obracun/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetObracun([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var obracun = await _context.Obracuni.FindAsync(id);

            if (obracun == null)
            {
                return NotFound();
            }

            // Found Data and add weak object
            obracun.Mlekara = await _context.Mlekare.FindAsync(obracun.MlekaraID);

            return Ok(obracun);
        }

        // PUT: api/Obracun/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutObracun([FromRoute] int id, [FromBody] Obracun obracun)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != obracun.ObracunID)
            {
                return BadRequest();
            }

            _context.Entry(obracun).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ObracunExists(id))
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

        // POST: api/Obracun
        [HttpPost]
        public async Task<IActionResult> PostObracun([FromBody] Obracun obracun)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Obracuni.Add(obracun);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetObracun", new { id = obracun.ObracunID }, obracun);
        }

        // DELETE: api/Obracun/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteObracun([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var obracun = await _context.Obracuni.FindAsync(id);
            if (obracun == null)
            {
                return NotFound();
            }

            _context.Obracuni.Remove(obracun);
            await _context.SaveChangesAsync();

            return Ok(obracun);
        }

        private bool ObracunExists(int id)
        {
            return _context.Obracuni.Any(e => e.ObracunID == id);
        }
    }
}