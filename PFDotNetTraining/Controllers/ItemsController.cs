using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PFDotNetTraining.Data.Context;
using PFDotNetTraining.Model;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PFDotNetTraining.Controllers
{
    [Authorize]
    [Route("api/{controller}")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly ShelfContext _context;
        private IMapper _mapper;

        public ItemsController(ShelfContext context)
        {
            _context = context;
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<Item, Item>();
            });
            _mapper = config.CreateMapper();
        }

        //GET: api/Items/all
        [HttpGet]
        [Route("all")]
        public async Task<ActionResult<IEnumerable<Item>>> GetItems()
        {
            return await _context.Items.AsNoTracking().OrderBy(item => item.CreatedDate).ToListAsync();
        }

        // GET: api/Items/5
        [HttpGet("id/{id}")]
        public async Task<ActionResult<Item>> GetItemById(int id)
        {
            var item = await _context.Items.FindAsync(id);

            if (item == null)
            {
                return NotFound();
            }

            return item;
        }

        // GET: api/Items/0
        [HttpGet("parent/{parent}")]
        public async Task<ActionResult<IEnumerable<Item>>> GetItemsByParentId(int parent)
        {
            var items = await _context.Items.AsNoTracking().Where(item => item.Parent == parent).OrderBy(item => item.ModifiedAt).ToListAsync();
            return items;
        }

        // PUT: api/Items/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut]
        public async Task<IActionResult> PutItem(Item item)
        {
            var entity = _context.Items.SingleOrDefault(x => x.Id == item.Id);
            if (entity != null)
            {
                _mapper.Map<Item, Item>(item, entity);
                await _context.SaveChangesAsync();
            }
            else
            {
                return NotFound();
            }

            return NoContent();
        }

        // POST: api/Items
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Item>> PostItem(Item item)
        {
            //var rs = _context.Database.ExecuteSqlRaw("SET IDENTITY_INSERT [dbo].[Items] ON");
            _context.Items.Add(item);
            await _context.SaveChangesAsync();

            //await _context.Database.ExecuteSqlRawAsync("SET IDENTITY_INSERT [dbo].[Items] OFF");

            return CreatedAtAction("GetItem", new { id = item.Id }, item);
        }

        // DELETE: api/Items/id/5
        [HttpDelete("id/{id}")]
        public async Task<IActionResult> DeleteItemById(int id)
        {
            var item = await _context.Items.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }
            await DeleteItemsByParent(id);
            _context.Items.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        //Recursively delete children of a parent item
        private async Task DeleteItemsByParent(int parent)
        {
            var items = await _context.Items.AsNoTracking().Where(item => item.Parent == parent).ToListAsync();
            foreach (var item in items)
            {
                int id = (int)item.Id;
                await DeleteItemsByParent(id);
                _context.Items.Remove(item);
            }
        }

        private bool ItemExists(int id)
        {
            return _context.Items.Any(e => e.Id == id);
        }
    }
}