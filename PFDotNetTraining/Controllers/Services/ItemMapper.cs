using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PFDotNetTraining.Model;
using AutoMapper;

namespace PFDotNetTraining.Controllers.Services
{
    public class ItemMapper : Profile
    {
        public ItemMapper()
        {
            CreateMap<Item, Item>();
        }
    }
}