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
    public class MlekaraController : ControllerBase
    {
        private readonly SaruljaContext _context;

        public MlekaraController(SaruljaContext context)
        {
            _context = context;
        }

        // GET: api/Mlekara
        [HttpGet]
        public IEnumerable<Mlekara> GetMlekare()
        {
            return _context.Mlekare;
        }

        // GET: api/Mlekara/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMlekara([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var mlekara = await _context.Mlekare.FindAsync(id);

            if (mlekara == null)
            {
                return NotFound();
            }

            // Found Data and add weak object
            mlekara.Mesto = await _context.Mesta.FindAsync(mlekara.MestaID);

            return Ok(mlekara);
        }

        // PUT: api/Mlekara/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMlekara([FromRoute] int id, [FromBody] Mlekara mlekara)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != mlekara.MlekaraID)
            {
                return BadRequest();
            }

            _context.Entry(mlekara).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MlekaraExists(id))
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

        // POST: api/Mlekara
        [HttpPost]
        public async Task<IActionResult> PostMlekara([FromBody] Mlekara mlekara)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Mlekare.Add(mlekara);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMlekara", new { id = mlekara.MlekaraID }, mlekara);
        }

        // DELETE: api/Mlekara/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMlekara([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var mlekara = await _context.Mlekare.FindAsync(id);
            if (mlekara == null)
            {
                return NotFound();
            }

            _context.Mlekare.Remove(mlekara);
            await _context.SaveChangesAsync();

            return Ok(mlekara);
        }

        private bool MlekaraExists(int id)
        {
            return _context.Mlekare.Any(e => e.MlekaraID == id);
        }
    }
}